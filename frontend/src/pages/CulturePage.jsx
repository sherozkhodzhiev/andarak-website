import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CULTURE_TOPICS, CULTURE_PAGE } from "@/data/portal";
import { KilimDivider } from "@/components/portal/Kilim";

const EASE = [0.22, 1, 0.36, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function CulturePage({ lang }) {
  const [openTopic, setOpenTopic] = useState(null);

  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-16 lg:py-24" data-testid="culture-page">
      <motion.p className="font-mono-d text-[11px] tracking-[.22em] uppercase mb-3" style={{ color: "var(--p-terra)" }} {...reveal(0)}>
        {CULTURE_PAGE.eyebrow[lang]}
      </motion.p>
      <motion.h1 className="font-display font-semibold" style={{ fontSize: "clamp(2.3rem, 4.6vw, 4rem)", color: "var(--p-ink)", lineHeight: 1.06 }} {...reveal(0.08)} data-testid="culture-title">
        {CULTURE_PAGE.title[lang]}
      </motion.h1>
      <motion.div className="mt-5 mb-5" {...reveal(0.14)}><KilimDivider /></motion.div>
      <motion.p className="text-sm md:text-base max-w-[560px] mb-14" style={{ color: "var(--p-slate)", lineHeight: 1.8 }} {...reveal(0.2)}>
        {CULTURE_PAGE.lead[lang]}
      </motion.p>

      <div className="culture-bento">
        {CULTURE_TOPICS.map((t, i) => (
          <motion.button
            key={t.id}
            className={`culture-card ${t.span || ""} ${t.img ? "has-img" : ""} text-left`}
            onClick={() => setOpenTopic(t)}
            {...reveal(0.05 * (i % 3))}
            data-testid={`culture-card-${t.id}`}
          >
            {t.img && (
              <div className="culture-card-img">
                <img src={t.img} alt={t.title[lang]} loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,36,51,.72), rgba(26,36,51,.1) 60%)" }} />
              </div>
            )}
            {t.glyph && !t.img && (
              <span className="culture-glyph font-display" aria-hidden="true">{t.glyph}</span>
            )}
            <div className="relative z-10 mt-auto">
              <p className="font-mono-d text-[10px] tracking-[.18em] uppercase mb-2" style={{ color: t.img ? "var(--p-gold)" : "var(--p-terra)" }}>
                {t.tag[lang]}
              </p>
              <h3 className="font-display font-semibold" style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)", color: t.img ? "#F8F7F3" : "var(--p-ink)", lineHeight: 1.15 }}>
                {t.title[lang]}
              </h3>
              <p className="mt-2 text-[13px] line-clamp-2" style={{ color: t.img ? "rgba(248,247,243,.75)" : "var(--p-slate)", lineHeight: 1.6 }}>
                {t.text[lang]}
              </p>
            </div>
            <span className="culture-more font-mono-d" style={{ color: t.img ? "var(--p-gold)" : "var(--p-terra)" }}>
              {lang === "ru" ? "подробнее +" : "read more +"}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openTopic && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4"
            style={{ background: "rgba(26,36,51,.6)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpenTopic(null)}
            data-testid="culture-modal"
          >
            <motion.div
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto"
              style={{ background: "#F8F7F3", border: "1px solid #D1CFC7" }}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {openTopic.img && (
                <div className="w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
                  <img src={openTopic.img} alt={openTopic.title[lang]} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono-d text-[10px] tracking-[.18em] uppercase mb-2" style={{ color: "var(--p-terra)" }}>{openTopic.tag[lang]}</p>
                    <h2 className="font-display font-semibold" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", color: "var(--p-ink)", lineHeight: 1.1 }} data-testid="culture-modal-title">
                      {openTopic.title[lang]}
                    </h2>
                  </div>
                  <button onClick={() => setOpenTopic(null)} aria-label="Close" data-testid="culture-modal-close" style={{ color: "var(--p-slate)" }}>
                    <X size={22} />
                  </button>
                </div>
                <div className="my-5"><KilimDivider /></div>
                <p className="text-[15px]" style={{ color: "var(--p-ink)", lineHeight: 1.9 }}>{openTopic.text[lang]}</p>
                <p className="mt-6 font-mono-d text-[10px] tracking-[.12em] uppercase" style={{ color: "var(--p-slate)" }}>
                  {lang === "ru" ? "Фото и материалы жителей появятся здесь — присылайте свои" : "Residents' photos and materials will appear here — send in yours"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
