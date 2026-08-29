import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/data/chapters";
import { GALLERY_PAGE } from "@/data/portal";
import { KilimDivider } from "@/components/portal/Kilim";

const EASE = [0.22, 1, 0.36, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function GalleryPage({ lang }) {
  const [idx, setIdx] = useState(null);

  const step = useCallback((d) => {
    setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (idx === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, step]);

  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-16 lg:py-24" data-testid="gallery-page">
      <motion.p className="font-mono-d text-[11px] tracking-[.22em] uppercase mb-3" style={{ color: "var(--p-terra)" }} {...reveal(0)}>
        {GALLERY_PAGE.eyebrow[lang]}
      </motion.p>
      <motion.h1 className="font-display font-semibold" style={{ fontSize: "clamp(2.3rem, 4.6vw, 4rem)", color: "var(--p-ink)", lineHeight: 1.06 }} {...reveal(0.08)} data-testid="gallery-page-title">
        {GALLERY_PAGE.title[lang]}
      </motion.h1>
      <motion.div className="mt-5 mb-5" {...reveal(0.14)}><KilimDivider /></motion.div>
      <motion.p className="text-sm md:text-base max-w-[560px] mb-14" style={{ color: "var(--p-slate)", lineHeight: 1.8 }} {...reveal(0.2)}>
        {GALLERY_PAGE.lead[lang]}
      </motion.p>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {GALLERY.map((p, i) => (
          <motion.figure key={p.src} className="mb-6 break-inside-avoid" {...reveal(0.05 * (i % 3))}>
            <button className="gallery-tile w-full" onClick={() => setIdx(i)} data-testid={`gallery-page-photo-${i + 1}`}>
              <img src={p.src} alt={p.caption[lang]} loading="lazy" className="w-full block" />
            </button>
            <figcaption className="font-mono-d text-[10px] mt-2.5 tracking-[.06em]" style={{ color: "var(--p-slate)" }}>
              {String(i + 1).padStart(2, "0")} / {p.caption[lang]}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center"
            style={{ background: "rgba(26,36,51,.92)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIdx(null)}
            data-testid="lightbox"
          >
            <button className="lightbox-btn" style={{ position: "absolute", top: 20, right: 20 }} onClick={() => setIdx(null)} aria-label="Close" data-testid="lightbox-close">
              <X size={22} />
            </button>
            <button className="lightbox-btn" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous" data-testid="lightbox-prev">
              <ChevronLeft size={24} />
            </button>
            <button className="lightbox-btn" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }} onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next" data-testid="lightbox-next">
              <ChevronRight size={24} />
            </button>
            <motion.figure
              key={idx}
              className="max-w-[88vw] max-h-[86vh] flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={GALLERY[idx].src} alt={GALLERY[idx].caption[lang]} className="max-w-full object-contain" style={{ maxHeight: "76vh" }} data-testid="lightbox-image" />
              <figcaption className="font-mono-d text-[11px] mt-4 tracking-[.06em] text-center" style={{ color: "rgba(248,247,243,.7)" }}>
                {String(idx + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")} — {GALLERY[idx].caption[lang]}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
