import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { CULTURE_TOPICS, CULTURE_PAGE } from "@/data/portal";
import { EASE, PageIntro, Reveal } from "@/components/portal/MotionKit";

export default function CulturePage({ lang }) {
  const [openTopic, setOpenTopic] = useState(null);
  return (
    <div className="neo-inner-page" data-testid="culture-page">
      <PageIntro index="01 / CULTURE" eyebrow={CULTURE_PAGE.eyebrow[lang]} title={CULTURE_PAGE.title[lang]} lead={CULTURE_PAGE.lead[lang]} />
      <section className="culture-stream">
        {CULTURE_TOPICS.map((t, i) => (
          <Reveal key={t.id} className={`culture-story ${i % 2 ? "culture-story-alt" : ""}`}>
            <button onClick={() => setOpenTopic(t)} data-testid={`culture-card-${t.id}`}>
              <div className="culture-story-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="culture-story-visual">
                {t.img ? <img src={t.img} alt={t.title[lang]} loading="lazy" /> : <span className="culture-glyph">{t.glyph || "✦"}</span>}
                <span className="pixel-tag" data-text={t.tag[lang]}>{t.tag[lang]}</span>
              </div>
              <div className="culture-story-copy"><p>{t.tag[lang]}</p><h2>{t.title[lang]}</h2><span>{t.text[lang]}</span><i>{lang === "ru" ? "Открыть историю" : "Open story"}<ArrowUpRight /></i></div>
            </button>
          </Reveal>
        ))}
      </section>

      <AnimatePresence>
        {openTopic && (
          <motion.div className="neo-modal-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenTopic(null)} data-testid="culture-modal">
            <motion.article className="neo-modal" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: .65, ease: EASE }} onClick={(e) => e.stopPropagation()}>
              <button className="neo-modal-close" onClick={() => setOpenTopic(null)} data-testid="culture-modal-close"><X /></button>
              {openTopic.img && <div className="neo-modal-image"><img src={openTopic.img} alt={openTopic.title[lang]} /></div>}
              <div className="neo-modal-copy"><p>{openTopic.tag[lang]}</p><h2 data-testid="culture-modal-title">{openTopic.title[lang]}</h2><span>{openTopic.text[lang]}</span></div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
