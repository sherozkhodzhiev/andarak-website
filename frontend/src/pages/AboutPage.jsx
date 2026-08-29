import { motion } from "framer-motion";
import { ABOUT_PAGE } from "@/data/portal";
import { KilimDivider, KilimWatermark } from "@/components/portal/Kilim";

const EASE = [0.22, 1, 0.36, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function AboutPage({ lang }) {
  return (
    <div className="relative max-w-[1280px] mx-auto px-5 lg:px-8 py-16 lg:py-24 overflow-hidden" data-testid="about-page">
      <KilimWatermark className="absolute top-10 -right-24 opacity-[.04] pointer-events-none" />
      <motion.p className="font-mono-d text-[11px] tracking-[.22em] uppercase mb-3" style={{ color: "var(--p-terra)" }} {...reveal(0)}>
        {ABOUT_PAGE.eyebrow[lang]}
      </motion.p>
      <motion.h1 className="font-display font-semibold" style={{ fontSize: "clamp(2.3rem, 4.6vw, 4rem)", color: "var(--p-ink)", lineHeight: 1.06 }} {...reveal(0.08)} data-testid="about-title">
        {ABOUT_PAGE.title[lang]}
      </motion.h1>
      <motion.div className="mt-5 mb-14" {...reveal(0.14)}><KilimDivider /></motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12 max-w-[980px]">
        {ABOUT_PAGE.blocks[lang].map(([head, text], i) => (
          <motion.div key={head} {...reveal(0.08 * i)} data-testid={`about-block-${i + 1}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono-d text-[11px]" style={{ color: "var(--p-gold)" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display font-semibold" style={{ fontSize: 24, color: "var(--p-ink)" }}>{head}</h3>
            </div>
            <p className="text-[14.5px]" style={{ color: "var(--p-slate)", lineHeight: 1.85 }}>{text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 p-6 lg:p-8 max-w-[980px]"
        style={{ background: "var(--p-bg2)", border: "1px solid var(--p-border)" }}
        {...reveal(0.1)}
        data-testid="about-pilot-note"
      >
        <p className="font-mono-d text-[11px] tracking-[.1em] uppercase" style={{ color: "var(--p-slate)", lineHeight: 1.9 }}>
          {ABOUT_PAGE.pilot[lang]}
        </p>
      </motion.div>
    </div>
  );
}
