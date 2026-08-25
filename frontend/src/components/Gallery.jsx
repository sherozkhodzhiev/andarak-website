import { motion } from "framer-motion";
import { GALLERY, UI } from "@/data/chapters";

const EASE = [0.22, 1, 0.36, 1];

export default function Gallery({ lang }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "18vh 8vw 14vh", borderBottom: "1px solid rgba(237,227,208,.06)" }}
      data-testid="village-gallery"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,.10), transparent 55%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          className="font-mono-d text-xs tracking-[.18em] uppercase flex items-center gap-3 mb-6"
          style={{ color: "var(--ember)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <span style={{ color: "var(--parchment-dim)" }}>+</span>
          <span style={{ width: 34, height: 1, background: "var(--parchment-dim)" }} />
          <span data-testid="gallery-eyebrow">{UI.galleryEyebrow[lang]}</span>
        </motion.div>

        <motion.h2
          className="font-display font-semibold mb-4"
          style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.2rem)", lineHeight: 1.06, color: "var(--parchment)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.12, ease: EASE }}
          data-testid="gallery-title"
          dangerouslySetInnerHTML={{ __html: UI.galleryTitle[lang] }}
        />

        <motion.p
          className="text-sm md:text-base font-light max-w-[560px] mb-16"
          style={{ lineHeight: 1.85, color: "var(--parchment-dim)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.24, ease: EASE }}
        >
          {UI.galleryIntro[lang]}
        </motion.p>

        <div className="gallery-wall">
          {GALLERY.map((photo, i) => (
            <motion.figure
              key={photo.src}
              className={`gallery-item ${photo.span || ""}`}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, delay: (i % 3) * 0.14, ease: EASE }}
              data-testid={`gallery-photo-${i + 1}`}
            >
              <div className="gallery-frame">
                <img src={photo.src} alt={photo.caption[lang]} loading="lazy" />
                <div className="gallery-scrim" />
              </div>
              <figcaption
                className="font-mono-d text-[10px] mt-3 tracking-[.06em]"
                style={{ color: "var(--muted)" }}
              >
                {String(i + 1).padStart(2, "0")} / {photo.caption[lang]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
