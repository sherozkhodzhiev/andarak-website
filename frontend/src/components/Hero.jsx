import { motion, useMotionValue, useTransform } from "framer-motion";
import { UI } from "@/data/chapters";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ lang, sectionRef }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ghostX = useTransform(mx, (v) => v * 40);
  const ghostY = useTransform(my, (v) => v * 24);
  const glowX = useTransform(mx, (v) => v * -60);
  const glowY = useTransform(my, (v) => v * -40);

  return (
    <section
      ref={sectionRef}
      data-chapter="0"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: glowX, y: glowY,
          background: "radial-gradient(ellipse at 50% 42%, rgba(228,87,46,.16), transparent 60%)",
        }}
      />
      <motion.div className="hero-ghost" style={{ x: ghostX, y: ghostY, translateX: "-50%", translateY: "-52%" }} aria-hidden="true">
        ANDARAK
      </motion.div>

      <motion.p
        className="font-mono-d text-xs tracking-[.24em] uppercase mb-8 relative z-10"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        data-testid="hero-kicker"
      >
        {UI.kicker[lang]}
      </motion.p>

      <h1
        className="font-display font-semibold relative z-10"
        style={{ fontSize: "clamp(2.8rem, 8vw, 6.8rem)", lineHeight: 1.04, color: "var(--parchment)" }}
        data-testid="hero-title"
      >
        {UI.heroLines[lang].map((line, i) => (
          <span className="mask-line" key={`${lang}-${i}`}>
            <motion.span
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.15, delay: 0.25 + i * 0.22, ease: EASE }}
            >
              {i === UI.heroLines[lang].length - 1 ? <em style={{ color: "var(--ember)" }}>{line}</em> : line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        className="relative z-10 mt-8 max-w-[52ch] text-sm md:text-base font-light"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
        data-testid="hero-intro"
      >
        {UI.heroIntro[lang]}
      </motion.p>

      <motion.div
        className="scroll-hint absolute bottom-10 font-mono-d text-[10px] tracking-[.16em] uppercase z-10"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        data-testid="hero-scroll-hint"
      >
        {UI.scrollHint[lang]} ↓
      </motion.div>
    </section>
  );
}
