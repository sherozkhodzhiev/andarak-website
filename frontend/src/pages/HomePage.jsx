import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { T, HOME_TEASERS, HOME_SOON } from "@/data/portal";
import { KilimDivider, KilimWatermark } from "@/components/portal/Kilim";

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
          <img src="/gallery/valley-green.png" alt="Андарак с высоты" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,36,51,.72), rgba(26,36,51,.18) 45%, rgba(26,36,51,.08))" }} />

        <motion.div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 lg:px-8 pb-[10vh]" style={{ opacity: fade }}>
          <motion.p
            className="font-mono-d text-[11px] tracking-[.22em] uppercase mb-5"
            style={{ color: "var(--p-gold)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {T.brandSub[lang]} · {lang === "ru" ? "Кыргызстан" : "Kyrgyzstan"}
          </motion.p>
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

      <section className="relative max-w-[1280px] mx-auto px-5 lg:px-8 py-20 lg:py-28" data-testid="home-teasers">
        <KilimWatermark className="absolute -top-10 right-0 opacity-[.04] pointer-events-none" />
        <motion.p className="font-mono-d text-[11px] tracking-[.22em] uppercase mb-3" style={{ color: "var(--p-terra)" }} {...reveal(0)}>
          {T.teasersEyebrow[lang]}
        </motion.p>
        <motion.h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)", color: "var(--p-ink)" }} {...reveal(0.08)}>
          {T.teasersTitle[lang]}
        </motion.h2>
        <motion.div className="mb-12" {...reveal(0.14)}><KilimDivider /></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {HOME_TEASERS.map((t, i) => (
            <motion.div key={t.to} {...reveal(0.1 + (i % 2) * 0.12)}>
              <Link to={t.to} className="teaser-card block group" data-testid={`teaser-${t.to.slice(1)}`}>
                <div className="teaser-img">
                  <img src={t.img} alt={t.title[lang]} loading="lazy" />
                  {t.dark && <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,10,8,.6), transparent 55%)" }} />}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {HOME_SOON.map((s, i) => (
            <motion.div key={s.title.en} className="soon-card" {...reveal(0.08 * i)} data-testid={`soon-card-${i + 1}`}>
              <span className="soon-badge mb-4">{T.soonBadge[lang]}</span>
              <h4 className="font-display font-semibold" style={{ fontSize: 19, color: "var(--p-ink)" }}>{s.title[lang]}</h4>
              <p className="mt-1.5 text-[13px]" style={{ color: "var(--p-slate)", lineHeight: 1.6 }}>{s.line[lang]}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
