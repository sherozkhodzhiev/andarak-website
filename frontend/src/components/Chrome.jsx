import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { CHAPTERS, FLAME_STATES, UI } from "@/data/chapters";

export default function Chrome({ active, lang, audioOn, playing, onLang, onAudio, onPlay, onDot }) {
  const chapter = active >= 1 ? CHAPTERS[active - 1] : null;
  const flame = FLAME_STATES[chapter ? chapter.flame : "alive"];

  return (
    <>
      <div className="fixed top-6 left-6 z-[100] flex items-center gap-3" style={{ mixBlendMode: "screen" }}>
        <svg
          width="26" height="34" viewBox="0 0 26 34"
          className={flame.cls}
          data-testid="flame-indicator"
          style={{ transition: "filter 1.2s ease" }}
        >
          <ellipse cx="13" cy="20" rx="12" ry="14" fill={flame.color} opacity="0.3" style={{ transition: "fill 1.2s ease" }} />
          <path
            d="M13 0 C13 9 20 12 20 20 C20 27 17 34 13 34 C9 34 6 27 6 20 C6 15 9 13 10 9 C7 14 8 18 10 20 C9 15 12 12 13 0 Z"
            fill={flame.color}
            style={{ transition: "fill 1.2s ease" }}
          />
        </svg>
        <span
          className="font-mono-d text-[10px] tracking-[.14em] uppercase"
          style={{ color: "var(--parchment-dim)" }}
          data-testid="flame-label"
        >
          {flame.label[lang]}
        </span>
      </div>

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

      <AnimatePresence>
        {chapter && (
          <motion.div
            key={chapter.id + lang}
            className="fixed bottom-7 left-6 z-[100] max-w-[300px] font-mono-d text-[11px]"
            style={{ lineHeight: 1.6, color: "var(--parchment-dim)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6 }}
            data-testid="score-cue"
          >
            <span className="uppercase tracking-[.12em] text-[10px]" style={{ color: "var(--ember)" }}>
              {UI.score[lang]}
            </span>
            <br />
            {chapter.cue[lang]}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
