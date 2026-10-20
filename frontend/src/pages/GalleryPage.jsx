import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/data/chapters";
import { GALLERY_PAGE } from "@/data/portal";
import { EASE, PageIntro } from "@/components/portal/MotionKit";

export default function GalleryPage({ lang }) {
  const [idx, setIdx] = useState(null);
  const step = useCallback((d) => setIdx((i) => i === null ? i : (i + d + GALLERY.length) % GALLERY.length), []);
  useEffect(() => {
    if (idx === null) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [idx, step]);

  return (
    <div className="neo-inner-page" data-testid="gallery-page">
      <PageIntro index="02 / ARCHIVE" eyebrow={GALLERY_PAGE.eyebrow[lang]} title={GALLERY_PAGE.title[lang]} lead={GALLERY_PAGE.lead[lang]} />
      <section className="gallery-sequence">
        {GALLERY.map((p, i) => (
          <motion.figure key={p.src} className={`gallery-frame gallery-frame-${i % 3}`} initial={{ opacity: 0, y: 100, rotate: i % 2 ? 1.5 : -1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: 1, delay: (i % 3) * .08, ease: EASE }}>
            <button onClick={() => setIdx(i)} data-testid={`gallery-page-photo-${i + 1}`}><img src={p.src} alt={p.caption[lang]} loading="lazy" /><span>EXPAND +</span></button>
            <figcaption><b>{String(i + 1).padStart(2, "0")}</b><span>{p.caption[lang]}</span></figcaption>
          </motion.figure>
        ))}
      </section>
      <AnimatePresence>
        {idx !== null && (
          <motion.div className="gallery-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)} data-testid="lightbox">
            <button className="gallery-close" onClick={() => setIdx(null)} data-testid="lightbox-close"><X /></button>
            <button className="gallery-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} data-testid="lightbox-prev"><ChevronLeft /></button>
            <motion.figure key={idx} initial={{ scale: .88, rotate: -1 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: .65, ease: EASE }} onClick={(e) => e.stopPropagation()}>
              <img src={GALLERY[idx].src} alt={GALLERY[idx].caption[lang]} data-testid="lightbox-image" /><figcaption>{String(idx + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")} — {GALLERY[idx].caption[lang]}</figcaption>
            </motion.figure>
            <button className="gallery-next" onClick={(e) => { e.stopPropagation(); step(1); }} data-testid="lightbox-next"><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
