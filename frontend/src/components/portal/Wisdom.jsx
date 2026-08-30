import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROVERBS, WISDOM_T } from "@/data/proverbs";
import { KilimDivider } from "@/components/portal/Kilim";

export default function Wisdom({ lang, variant = "band" }) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * PROVERBS.length));

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PROVERBS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const p = PROVERBS[idx];

  if (variant === "line") {
    return (
      <div className="py-2" data-testid="wisdom-line">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-display italic" style={{ fontSize: 19, lineHeight: 1.5, color: "rgba(248,247,243,.85)" }}>«{p.original}»</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-1.5 text-[12.5px]"
                style={{ color: "rgba(248,247,243,.5)", lineHeight: 1.6 }}
              >
                {p.translations[lang]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#16202E", padding: "clamp(4.5rem, 9vw, 8rem) 8vw" }}
      data-testid="wisdom-band"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(212,175,55,.08), transparent 60%)" }}
      />
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <p className="font-mono-d text-[10.5px] tracking-[.3em] uppercase" style={{ color: "var(--p-gold)" }} data-testid="wisdom-eyebrow">
          {WISDOM_T.eyebrow[lang]}
        </p>
        <div className="flex justify-center mt-6 mb-9"><KilimDivider opacity={0.45} /></div>

        <div style={{ minHeight: 150 }} className="flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              data-testid="wisdom-quote"
            >
              <p
                className="font-display italic font-medium"
                style={{ fontSize: "clamp(1.7rem, 3.6vw, 3rem)", lineHeight: 1.35, color: "#F8F7F3" }}
                data-testid="wisdom-original"
              >
                «{p.original}»
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 text-sm md:text-base font-light"
                  style={{ color: "rgba(248,247,243,.62)", lineHeight: 1.7 }}
                  data-testid="wisdom-translation"
                >
                  {p.translations[lang]}
                </motion.p>
              </AnimatePresence>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <p className="font-mono-d text-[9.5px] tracking-[.2em] uppercase mt-8" style={{ color: "rgba(248,247,243,.32)" }}>
          — {WISDOM_T.source[lang]} —
        </p>
      </div>
    </section>
  );
}
