import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { CHAPTERS, UI } from "@/data/chapters";

export default function Chrome({ active, lang, audioOn, playing, onLang, onAudio, onPlay, onDot }) {
  return (
    <>
      <div className="fixed top-6 right-6 z-[100] flex gap-3 items-center">
        <button className="ctrl-btn" onClick={onLang} data-testid="lang-toggle-btn">
          {lang === "en" ? "RU" : "EN"}
        </button>
        <button className="ctrl-btn" onClick={onAudio} data-testid="audio-toggle-btn">
          {audioOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          {audioOn ? UI.audioOn[lang] : UI.audioOff[lang]}
        </button>
        <button className="ctrl-btn" onClick={onPlay} data-testid="play-through-btn">
          {playing ? <Pause size={13} /> : <Play size={13} />}
          {playing ? UI.playing[lang] : UI.play[lang]}
        </button>
      </div>

      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-3.5" data-testid="chapter-nav">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            className="group relative w-2 h-2 rounded-full cursor-pointer transition-transform duration-300"
            style={{
              background: active === i + 1 ? "var(--parchment)" : "rgba(237,227,208,.25)",
              transform: active === i + 1 ? "scale(1.35)" : "scale(1)",
            }}
            onClick={() => onDot(i + 1)}
            data-testid={`chapter-dot-${c.num}`}
          >
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 font-mono-d text-[10px] tracking-[.08em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ color: "var(--parchment-dim)" }}
            >
              {c.num} — {c.eyebrow[lang]}
            </span>
          </div>
        ))}
      </nav>

    </>
  );
}
