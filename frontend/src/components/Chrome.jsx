import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { CHAPTERS, FLAME_STATES, UI } from "@/data/chapters";

function Farvahar({ lit }) {
  return (
    <svg
      width="36" height="26" viewBox="0 0 44 28"
      data-testid="symbol-farvahar" role="img" aria-label="Farvahar — symbol of ancient Sogdiana"
      style={{ opacity: lit ? 1 : 0.2, transition: "opacity 1.2s ease" }}
    >
      <g fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="22" cy="10" r="3.4" />
        <path d="M18.4 8.6 L3 4.2" />
        <path d="M18.4 10.4 L4.5 9" />
        <path d="M18.4 12.2 L6 13.8" />
        <path d="M25.6 8.6 L41 4.2" />
        <path d="M25.6 10.4 L39.5 9" />
        <path d="M25.6 12.2 L38 13.8" />
        <path d="M20.3 13 L17.5 24.5" />
        <path d="M23.7 13 L26.5 24.5" />
      </g>
    </svg>
  );
}

function Crescent({ lit }) {
  return (
    <svg
      width="20" height="24" viewBox="0 0 20 24"
      data-testid="symbol-crescent" role="img" aria-label="Crescent — symbol of the Islamic era"
      style={{ opacity: lit ? 1 : 0.2, transition: "opacity 1.2s ease" }}
    >
      <path d="M14.6 1.6 A10.6 10.6 0 1 0 14.6 22.4 A8.5 8.5 0 1 1 14.6 1.6 Z" fill="#EDE3D0" />
    </svg>
  );
}

export default function Chrome({ active, lang, audioOn, playing, onLang, onAudio, onPlay, onDot }) {
  const chapter = active >= 1 ? CHAPTERS[active - 1] : null;
  const flame = FLAME_STATES[chapter ? chapter.flame : "alive"];
  const farvaharLit = active >= 1 && active <= 4;
  const crescentLit = active >= 5;

  return (
    <>
      <div className="fixed top-6 left-6 z-[100]" style={{ mixBlendMode: "screen" }}>
        <div className="flex items-center gap-4">
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
          <Farvahar lit={farvaharLit} />
          <Crescent lit={crescentLit} />
        </div>
        <span
          className="font-mono-d text-[10px] tracking-[.14em] uppercase block mt-1.5"
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
