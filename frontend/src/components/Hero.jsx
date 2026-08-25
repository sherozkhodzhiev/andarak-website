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
        {UI.heroGhost[lang]}
      </motion.div>

      <motion.p
        className="font-mono-d text-xs tracking-[.24em] uppercase mb-6 relative z-10"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        data-testid="hero-kicker"
      >
        {UI.kicker[lang]}
      </motion.p>

      <h1 className="font-display relative z-10" data-testid="hero-title">
        <span className="mask-line">
          <motion.span
            style={{
              fontWeight: 600,
              fontSize: "clamp(3.4rem, 12vw, 10.5rem)",
              lineHeight: 1,
              letterSpacing: ".05em",
              color: "var(--parchment)",
            }}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          >
            {UI.heroName[lang]}
          </motion.span>
        </span>
        <span className="mask-line">
          <motion.span
            className="inline-block mt-4"
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              color: "var(--ember)",
            }}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
            data-testid="hero-subtitle"
          >
            {UI.heroSub[lang]}
          </motion.span>
        </span>
      </h1>

      <motion.p
        className="relative z-10 mt-9 max-w-[52ch] text-sm md:text-base font-light"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.05, ease: EASE }}
        data-testid="hero-intro"
      >
        {UI.heroIntro[lang]}
      </motion.p>

      <motion.div
        className="scroll-hint absolute bottom-10 font-mono-d text-[10px] tracking-[.16em] uppercase z-10"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        data-testid="hero-scroll-hint"
      >
        {UI.scrollHint[lang]} ↓
      </motion.div>
    </section>
  );
}
