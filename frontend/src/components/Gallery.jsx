import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GALLERY, UI } from "@/data/chapters";

function VillageScene({ photo, index, lang }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 82, damping: 28, mass: 0.24 });
  const scale = useTransform(p, [0, 0.5, 1], [1.26, 1.04, 1.2]);
  const y = useTransform(p, [0, 1], ["-7%", "7%"]);
  const copyY = useTransform(p, [0.15, 0.5, 0.88], [80, 0, -70]);
  const copyOpacity = useTransform(p, [0.13, 0.3, 0.74, 0.92], [0, 1, 1, 0]);
  const caption = photo.caption[lang];
  const title = index === 0 ? (lang === "ru" ? "Село,<br><em>сейчас.</em>" : "The village,<br><em>now.</em>") : (lang === "ru" ? "Земля,<br><em>которая помнит.</em>" : "A land<br><em>that remembers.</em>");

  return (
    <section className="cinema-chapter village-cinema" ref={ref} data-testid={`gallery-photo-${index + 1}`} style={{ "--cinema-accent": "#e8c47c", "--cinema-wash": "rgba(28,48,33,.34)" }}>
      <div className="cinema-stage">
        <motion.img className="cinema-scene" src={photo.src} alt={caption} loading="lazy" style={{ scale, y }} />
        <div className="cinema-shade village-shade" /><div className="cinema-color" /><div className="cinema-grain" /><div className="cinema-horizon" />
        <motion.div className="cinema-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <p className="cinema-index"><span>{String(index + 1).padStart(2, "0")}</span><i />{index === 0 ? UI.galleryEyebrow[lang] : (lang === "ru" ? "АНДАРАК · АРХИВ" : "ANDARAK · ARCHIVE")}</p>
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </motion.div>
        <motion.div className="cinema-marker" style={{ opacity: copyOpacity }}><b>{String(index + 1).padStart(2, "0")}</b><span>{caption}</span></motion.div>
      </div>
    </section>
  );
}

export default function Gallery({ lang }) {
  return <section data-testid="village-gallery">{GALLERY.map((photo, index) => <VillageScene key={photo.src} photo={photo} index={index} lang={lang} />)}</section>;
}
