import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y: 70, clipPath: "inset(18% 0 0 0)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 1.05, delay, ease: EASE }}>
      {children}
    </M>
  );
}

export function KineticText({ children, className = "", as = "h1" }) {
  const M = motion[as] || motion.h1;
  return (
    <M className={`kinetic-type ${className}`} aria-label={children}>
      {String(children).split(" ").map((word, i) => (
        <span className="kinetic-mask" key={`${word}-${i}`}>
          <motion.span className="kinetic-word" data-text={word} initial={{ y: "112%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.12 + i * 0.075, ease: EASE }}>
            {word}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function FlowLines({ className = "" }) {
  const reduce = useReducedMotion();
  const paths = [
    "M-40 135 C130 0 230 255 405 100 S680 55 845 150 S1110 225 1290 40",
    "M-40 165 C125 30 250 270 420 120 S680 85 850 175 S1110 250 1290 65",
    "M-40 195 C120 60 270 285 435 140 S685 115 855 200 S1115 275 1290 90",
    "M-40 225 C115 90 290 300 450 160 S690 145 860 225 S1120 300 1290 115",
    "M-40 255 C110 120 310 315 465 180 S695 175 865 250 S1125 325 1290 140",
  ];
  return (
    <svg className={`flow-lines ${className}`} viewBox="0 0 1250 340" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => <motion.path key={d} d={d} initial={reduce ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 - i * 0.1 }} viewport={{ once: true }} transition={{ duration: 1.8, delay: i * 0.08, ease: EASE }} />)}
    </svg>
  );
}

export function PageIntro({ index, eyebrow, title, lead }) {
  return (
    <section className="neo-page-intro">
      <div className="neo-grid-label">{index}</div>
      <div className="neo-intro-copy">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="neo-eyebrow">{eyebrow}</motion.p>
        <KineticText className="neo-page-title">{title}</KineticText>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: EASE }} className="neo-lead">{lead}</motion.p>
      </div>
      <FlowLines />
    </section>
  );
}
