import { useEffect, useRef, useState } from "react";

const MAX_VOL = 55;

function fadeVolume(player, from, to, ms, done) {
  const start = performance.now();
  const step = (t) => {
    const k = Math.min((t - start) / ms, 1);
    try {
      player.setVolume(Math.round(from + (to - from) * k));
    } catch (e) { /* player not ready */ }
    if (k < 1) requestAnimationFrame(step);
    else if (done) done();
  };
  requestAnimationFrame(step);
}

export function useYouTubeScore(on, videoId, onError) {
  const errorRef = useRef(onError);
  errorRef.current = onError;
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const currentRef = useRef(null);
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    if (!on) return;
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      setApiReady(true);
    };
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, [on]);

  useEffect(() => {
    if (!apiReady || playerRef.current) return;
    let el = document.getElementById("yt-score-player");
    if (!el) {
      el = document.createElement("div");
      el.id = "yt-score-player";
      el.setAttribute("data-testid", "yt-score-player");
      el.style.cssText = "position:fixed;left:-20px;top:-20px;width:2px;height:2px;opacity:0;pointer-events:none;";
      document.body.appendChild(el);
    }
    playerRef.current = new window.YT.Player(el, {
      width: 2,
      height: 2,
      playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0, autoplay: 1, mute: 1 },
      events: {
        onReady: () => setPlayerReady(true),
        onError: (e) => {
          window.__ytErr = e.data;
          if (currentRef.current && errorRef.current) errorRef.current(currentRef.current, e.data);
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.ENDED) {
            try { e.target.playVideo(); } catch (err) { /* released */ }
          }
          if (e.data === window.YT.PlayerState.PLAYING && shouldPlayRef.current) {
            try {
              if (e.target.isMuted && e.target.isMuted()) e.target.unMute();
            } catch (err) { /* released */ }
          }
          if ((e.data === window.YT.PlayerState.UNSTARTED || e.data === window.YT.PlayerState.CUED) && shouldPlayRef.current) {
            try { e.target.playVideo(); } catch (err) { /* released */ }
          }
        },
      },
    });
    window.__ytScore = playerRef.current;
  }, [apiReady]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    if (!on || !videoId) {
      shouldPlayRef.current = false;
      if (currentRef.current) {
        fadeVolume(player, MAX_VOL, 0, 900, () => {
          try { player.pauseVideo(); } catch (e) { /* released */ }
        });
        currentRef.current = null;
      }
      return;
    }
    if (currentRef.current === videoId) return;
    currentRef.current = videoId;
    shouldPlayRef.current = true;
    fadeVolume(player, MAX_VOL, 0, 900, () => {
      try {
        if (player.mute) player.mute();
        player.loadVideoById(videoId);
        player.playVideo();
        player.setVolume(0);
        fadeVolume(player, 0, MAX_VOL, 1500);
      } catch (e) { /* released */ }
    });
  }, [on, videoId, playerReady]);
}
