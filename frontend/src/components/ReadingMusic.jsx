import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Volume2, VolumeX } from "lucide-react";

// Prepare the active chapter before its reading panel opens, so its opening tap
// can request playback directly rather than waiting for the YouTube API to load.
const ReadingMusic = forwardRef(function ReadingMusic({ videoId, lang, enabled, controlId }, ref) {
  const host = useRef(null);
  const player = useRef(null);
  const requested = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [control, setControl] = useState(null);
  const ru = lang === "ru";

  function start() {
    requested.current = true;
    if (!player.current?.playVideo) return;
    player.current.unMute();
    player.current.playVideo();
  }
  function stop() {
    requested.current = false;
    player.current?.pauseVideo?.();
    setPlaying(false);
  }
  useImperativeHandle(ref, () => ({ start, stop }));

  useEffect(() => {
    setControl(enabled ? document.getElementById(controlId) : null);
    if (enabled) start();
    else stop();
  }, [enabled, controlId]);

  useEffect(() => {
    let disposed = false;
    let attempts = 0;
    setReady(false);
    setPlaying(false);
    setFailed(false);
    if (!document.getElementById("yt-iframe-api")) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
    const timer = window.setInterval(() => {
      if (disposed) return;
      if (!window.YT?.Player) {
        if (++attempts > 150) { clearInterval(timer); setFailed(true); }
        return;
      }
      clearInterval(timer);
      const element = document.createElement("div");
      host.current.appendChild(element);
      player.current = new window.YT.Player(element, {
        width: "200", height: "200", videoId,
        playerVars: { controls: 0, playsinline: 1, rel: 0, start: videoId === "DjJ9mOuACoc" ? 18 : 0, origin: window.location.origin },
        events: {
          onReady: (event) => {
            if (disposed) return;
            setReady(true);
            event.target.setVolume(40);
            if (requested.current) {
              event.target.unMute();
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (disposed) return;
            // A late ready/play event must never restart a closed panel.
            if (event.data === 1 && !requested.current) event.target.pauseVideo();
            setPlaying(event.data === 1 && requested.current);
          },
          onAutoplayBlocked: () => { if (!disposed) setPlaying(false); },
          onError: () => { if (!disposed) { setFailed(true); setPlaying(false); } },
        },
      });
    }, 100);
    return () => {
      disposed = true;
      clearInterval(timer);
      player.current?.destroy();
      player.current = null;
    };
  }, [videoId]);

  const label = failed ? (ru ? "Музыка недоступна" : "Music unavailable")
    : playing ? (ru ? "Выключить музыку" : "Turn music off")
    : (ru ? "Включить музыку" : "Turn music on");
  return <>
    <div ref={host} className="hc-music-player" aria-hidden="true" inert />
    {enabled && control && createPortal(
      <button type="button" className="hc-sound-toggle" disabled={!ready || failed}
        aria-label={label} title={label} aria-pressed={playing}
        data-testid="chapter-sound-toggle" onClick={() => playing ? stop() : start()}>
        {playing ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
      </button>, control)}
  </>;
});
export default ReadingMusic;
