import { useCallback, useEffect, useRef, useState } from "react";

const MAX_VOL = 55;
const LOAD_TIMEOUT = 15000;

function fadeVolume(player, from, to, ms, done) {
  const start = performance.now();
  let frame;
  let cancelled = false;
  const step = (t) => {
    if (cancelled) return;
    const k = Math.min((t - start) / ms, 1);
    try {
      player.setVolume(Math.round(from + (to - from) * k));
    } catch (e) { /* player not ready */ }
    if (k < 1) frame = requestAnimationFrame(step);
    else if (done) done();
  };
  frame = requestAnimationFrame(step);
  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };
}

export function useYouTubeScore(on, videoId, onError) {
  const errorRef = useRef(onError);
  errorRef.current = onError;
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [status, setStatus] = useState("off");
  const playerRef = useRef(null);
  const currentRef = useRef(null);
  const shouldPlayRef = useRef(false);
  const desiredRef = useRef({ on, videoId });
  desiredRef.current = { on, videoId };
  const cancelFadeRef = useRef(() => {});
  const playbackTimerRef = useRef(null);
  const errorReportedRef = useRef(false);

  const reportError = useCallback((code) => {
    if (errorReportedRef.current) return;
    errorReportedRef.current = true;
    setStatus("error");
    shouldPlayRef.current = false;
    cancelFadeRef.current();
    clearTimeout(playbackTimerRef.current);
    try {
      playerRef.current?.mute();
      playerRef.current?.pauseVideo();
    } catch (e) { /* player may not be ready */ }
    window.__ytErr = code;
    errorRef.current?.(desiredRef.current.videoId, code);
  }, []);

  useEffect(() => {
    if (!on) {
      setStatus("off");
      return;
    }
    setStatus("loading");
    errorReportedRef.current = false;
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    let live = true;
    let settled = false;
    const prev = window.onYouTubeIframeAPIReady;
    const ready = () => {
      try { if (typeof prev === "function") prev(); } finally {
        if (live) {
          settled = true;
          clearTimeout(timeout);
          setApiReady(true);
        }
      }
    };
    window.onYouTubeIframeAPIReady = ready;
    let tag = document.getElementById("yt-iframe-api");
    const created = !tag;
    if (created) {
      tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
    }
    const fail = () => {
      if (!live || settled) return;
      settled = true;
      clearTimeout(timeout);
      tag.remove();
      reportError("api-load-failed");
    };
    const timeout = setTimeout(fail, LOAD_TIMEOUT);
    tag.addEventListener("error", fail);
    if (created) document.body.appendChild(tag);
    return () => {
      live = false;
      clearTimeout(timeout);
      tag.removeEventListener("error", fail);
      if (window.onYouTubeIframeAPIReady === ready) {
        window.onYouTubeIframeAPIReady = prev;
      }
    };
  }, [on, reportError]);

  useEffect(() => {
    if (!apiReady || playerRef.current) return;
    let live = true;
    let player;
    setPlayerReady(false);
    const el = document.createElement("div");
    el.id = "yt-score-player";
    el.setAttribute("data-testid", "yt-score-player");
    el.style.cssText = "position:fixed;left:-20px;top:-20px;width:2px;height:2px;opacity:0;pointer-events:none;";
    document.body.appendChild(el);
    const timeout = setTimeout(() => {
      if (live) reportError("player-load-timeout");
    }, LOAD_TIMEOUT);
    try {
      player = new window.YT.Player(el, {
        width: 2,
        height: 2,
        playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0, autoplay: 0, mute: 1 },
        events: {
        onReady: (e) => {
          if (!live) return;
          clearTimeout(timeout);
          const frame = e.target.getIframe();
          frame.setAttribute("tabindex", "-1");
          frame.setAttribute("aria-hidden", "true");
          setPlayerReady(true);
        },
        onError: (e) => {
          if (live) reportError(e.data);
        },
        onAutoplayBlocked: () => {
          if (live && shouldPlayRef.current) reportError("autoplay-blocked");
        },
        onStateChange: (e) => {
          if (!live || !desiredRef.current.on || !shouldPlayRef.current) return;
          if (e.data === window.YT.PlayerState.ENDED) {
            try { e.target.playVideo(); } catch (err) { reportError("playback-failed"); }
          }
          if (e.data === window.YT.PlayerState.PLAYING) {
            setStatus("playing");
            clearTimeout(playbackTimerRef.current);
            try {
              if (e.target.isMuted && e.target.isMuted()) e.target.unMute();
            } catch (err) { reportError("playback-failed"); }
          }
          if (e.data === window.YT.PlayerState.CUED) {
            try { e.target.playVideo(); } catch (err) { reportError("playback-failed"); }
          }
        },
        },
      });
      playerRef.current = player;
      window.__ytScore = player;
    } catch (e) {
      clearTimeout(timeout);
      reportError("player-create-failed");
    }
    return () => {
      live = false;
      shouldPlayRef.current = false;
      cancelFadeRef.current();
      clearTimeout(timeout);
      clearTimeout(playbackTimerRef.current);
      try { player?.destroy(); } catch (e) { /* already released */ }
      el.remove();
      if (playerRef.current === player) playerRef.current = null;
      if (window.__ytScore === player) delete window.__ytScore;
      currentRef.current = null;
    };
  }, [apiReady, reportError]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    let live = true;
    let cancelFade = () => {};
    const cleanup = () => {
      live = false;
      cancelFade();
      clearTimeout(playbackTimerRef.current);
    };
    cancelFadeRef.current = cleanup;
    const volume = () => {
      try { return player.getVolume(); } catch (e) { return 0; }
    };
    if (!on || !videoId) {
      shouldPlayRef.current = false;
      if (currentRef.current) {
        cancelFade = fadeVolume(player, volume(), 0, 900, () => {
          try { player.pauseVideo(); } catch (e) { /* released */ }
        });
        currentRef.current = null;
      }
      return cleanup;
    }
    errorReportedRef.current = false;
    if (currentRef.current === videoId) return cleanup;
    currentRef.current = videoId;
    setStatus("loading");
    shouldPlayRef.current = true;
    cancelFade = fadeVolume(player, volume(), 0, 900, () => {
      if (!live || !desiredRef.current.on || desiredRef.current.videoId !== videoId) return;
      try {
        if (player.mute) player.mute();
        player.loadVideoById(videoId);
        player.setVolume(0);
        playbackTimerRef.current = setTimeout(() => {
          if (live) reportError("playback-timeout");
        }, LOAD_TIMEOUT);
        player.playVideo();
        if (!live) return;
        cancelFade = fadeVolume(player, 0, MAX_VOL, 1500);
      } catch (e) { reportError("playback-failed"); }
    });
    return cleanup;
  }, [on, videoId, playerReady, reportError]);

  return status;
}
