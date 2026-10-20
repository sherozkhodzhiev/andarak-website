import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume1, Volume2 } from "lucide-react";

// This component exists only while its chapter's reading panel is open.
export default function ReadingMusic({ videoId, lang }) {
  const host = useRef(null);
  const player = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const [failed, setFailed] = useState(false);
  const ru = lang === "ru";

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
        width: "100%", height: "220", videoId,
        playerVars: { controls: 1, playsinline: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: (event) => {
            if (disposed) return;
            setReady(true);
            event.target.setVolume(40);
            event.target.playVideo();
          },
          onStateChange: (event) => { if (!disposed) setPlaying(event.data === 1); },
          onError: () => { if (!disposed) setFailed(true); },
        },
      });
    }, 100);
    return () => {
      disposed = true;
      clearInterval(timer);
      // Destroy immediately: no delayed fades that can restart a closed chapter.
      player.current?.destroy();
      player.current = null;
    };
  }, [videoId]);

  function changeVolume(next) {
    const value = Math.max(0, Math.min(100, next));
    setVolume(value);
    player.current?.setVolume(value);
    if (value > 0) player.current?.unMute();
  }

  return (
    <div className="hc-music">
      <div className="hc-music-controls" role="group" aria-label={ru ? "Музыка главы" : "Chapter music"}>
        <button disabled={!ready || failed} aria-label={playing ? (ru ? "Пауза" : "Pause music") : (ru ? "Слушать" : "Play music")} onClick={() => playing ? player.current?.pauseVideo() : player.current?.playVideo()}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
        <button disabled={!ready || failed} aria-label={ru ? "Тише" : "Volume down"} onClick={() => changeVolume(volume - 10)}><Volume1 size={18} /></button>
        <input disabled={!ready || failed} type="range" min="0" max="100" value={volume} aria-label={ru ? "Громкость" : "Volume"} onChange={(e) => changeVolume(Number(e.target.value))} />
        <button disabled={!ready || failed} aria-label={ru ? "Громче" : "Volume up"} onClick={() => changeVolume(volume + 10)}><Volume2 size={18} /></button>
      </div>
      <div ref={host} className="hc-music-video" />
      <p className="hc-music-note" role="status">{failed ? (ru ? "Трек недоступен. Вы можете продолжить чтение без музыки." : "Track unavailable. You can continue reading without music.") : (ru ? "Если звук не начался, нажмите ▶. На телефоне также используйте кнопки громкости." : "If sound doesn’t start, tap ▶. On phones, you can also use the device volume buttons.")}</p>
    </div>
  );
}
