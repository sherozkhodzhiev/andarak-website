import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { T, HOME_TEASERS } from "@/data/portal";
import Wisdom from "@/components/portal/Wisdom";

const EASE = [0.22, 1, 0.36, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function HomePage({ lang }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div data-testid="home-page">
      <section ref={heroRef} className="relative overflow-hidden flex items-end" style={{ minHeight: "92vh" }} data-testid="home-hero">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.12 }}>
          <img src="/gallery/hero-valley.jpg" alt="Андарак" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,36,51,.72), rgba(26,36,51,.18) 45%, rgba(26,36,51,.08))" }} />

        <motion.div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 lg:px-8 pb-[10vh]" style={{ opacity: fade }}>
          <motion.h1
            className="font-display font-semibold"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.6rem)", lineHeight: 1.04, color: "#F8F7F3", maxWidth: 900 }}
            initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.28, ease: EASE }}
            data-testid="home-slogan"
          >
            {T.heroSlogan[lang]}
          </motion.h1>
          <motion.p
            className="mt-6 text-sm md:text-base font-light"
            style={{ color: "rgba(248,247,243,.82)", maxWidth: 520, lineHeight: 1.8 }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45, ease: EASE }}
          >
            {T.heroLead[lang]}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: EASE }}
          >
            <Link to="/history" className="btn-terra" data-testid="hero-explore-button">
              {T.heroCta[lang]} <ArrowRight size={16} />
            </Link>
            <Link to="/culture" className="btn-ghost-light" data-testid="hero-culture-button">
              {T.heroSecondary[lang]}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Wisdom lang={lang} />

      <section className="relative max-w-[1280px] mx-auto px-5 lg:px-8 py-20 lg:py-24" data-testid="home-teasers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {HOME_TEASERS.map((t, i) => (
            <motion.div key={t.to} {...reveal(0.1 + (i % 2) * 0.12)}>
              <Link to={t.to} className="teaser-card block group" data-testid={`teaser-${t.to.slice(1)}`}>
                <div className="teaser-img">
                  <img src={t.img} alt={t.title[lang]} loading="lazy" />
                </div>
                <div className="flex items-start justify-between gap-4 pt-5 pb-6 px-1">
                  <div>
                    <h3 className="font-display font-semibold" style={{ fontSize: 24, color: "var(--p-ink)" }}>{t.title[lang]}</h3>
                    <p className="mt-1.5 text-sm" style={{ color: "var(--p-slate)", lineHeight: 1.65 }}>{t.line[lang]}</p>
                  </div>
                  <span className="teaser-arrow"><ArrowRight size={17} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
