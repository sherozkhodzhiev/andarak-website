import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const CHAPTER_MOODS = {
  sogdiana: { accent: "#f1a34c", wash: "rgba(100,45,17,.46)", position: "50% 48%", motion: "The flame answers the wind." },
  invasion: { accent: "#dc9b4f", wash: "rgba(76,44,18,.48)", position: "58% 50%", motion: "Dust rises at the edge of the valley." },
  alexandria: { accent: "#d9bd78", wash: "rgba(62,55,36,.42)", position: "50% 48%", motion: "Stone changes the horizon." },
  death: { accent: "#b8c0a1", wash: "rgba(43,51,37,.45)", position: "48% 53%", motion: "The land takes its breath back." },
  conquest: { accent: "#e16d43", wash: "rgba(93,23,16,.54)", position: "52% 50%", motion: "The old fire becomes memory." },
  samanid: { accent: "#e5bf67", wash: "rgba(92,58,18,.38)", position: "50% 47%", motion: "A new dawn fills the libraries." },
  mongol: { accent: "#ed8257", wash: "rgba(75,23,19,.56)", position: "50% 50%", motion: "Ash crosses the sky like snow." },
  steppe: { accent: "#bdc28d", wash: "rgba(46,62,38,.42)", position: "50% 50%", motion: "Roads open. Voices return." },
  empires: { accent: "#d6b67d", wash: "rgba(48,31,25,.50)", position: "52% 48%", motion: "A pencil divides a valley." },
  today: { accent: "#f0c877", wash: "rgba(24,38,26,.38)", position: "50% 50%", motion: "The village remains." },
};

export default function Chapter({ chapter, index, lang, sectionRef }) {
  const localRef = useRef(null);
  const [ready, setReady] = useState(true);
  const { scrollYProgress } = useScroll({ target: localRef, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 82, damping: 28, mass: 0.24 });
  const imageScale = useTransform(p, [0, 0.38, 1], [1.28, 1.04, 1.2]);
  const imageY = useTransform(p, [0, 0.5, 1], ["-7%", "0%", "7%"]);
  const imageX = useTransform(p, [0, 1], [index % 2 ? "5%" : "-5%", index % 2 ? "-5%" : "5%"]);
  const titleY = useTransform(p, [0.16, 0.48, 0.85], [70, 0, -70]);
  const titleOpacity = useTransform(p, [0.12, 0.32, 0.74, 0.92], [0, 1, 1, 0]);
  const detailY = useTransform(p, [0.35, 0.66, 0.9], [38, 0, -30]);
  const detailOpacity = useTransform(p, [0.35, 0.56, 0.83], [0, 1, 0]);
  const shade = useTransform(p, [0, 0.5, 1], [0.74, 0.28, 0.72]);
  const mood = CHAPTER_MOODS[chapter.id];

  return (
    <section ref={(el) => { localRef.current = el; if (typeof sectionRef === "function") sectionRef(el); }} data-chapter={index + 1} data-testid={`chapter-${chapter.num}`} className="cinema-chapter" style={{ "--cinema-accent": mood.accent, "--cinema-wash": mood.wash }}>
      <div className="cinema-stage">
        {ready ? <motion.img className="cinema-scene" src={chapter.art} alt={chapter.caption[lang]} onError={() => setReady(false)} style={{ scale: imageScale, x: imageX, y: imageY, objectPosition: mood.position }} /> : <div className="cinema-no-art" />}
        <motion.div className="cinema-shade" style={{ opacity: shade }} />
        <div className="cinema-color" /><div className="cinema-grain" /><div className="cinema-horizon" aria-hidden="true" />
        <motion.div className="cinema-copy" style={{ y: titleY, opacity: titleOpacity }}>
          <p className="cinema-index"><span>{chapter.num}</span><i />{chapter.eyebrow[lang]}</p>
          <h2 data-testid={`title-${chapter.num}`} dangerouslySetInnerHTML={{ __html: chapter.title[lang] }} />
          <p className="cinema-one-line">{mood.motion}</p>
        </motion.div>
        <motion.aside className="cinema-detail" style={{ y: detailY, opacity: detailOpacity }}><span>{lang === "ru" ? "СЦЕНА" : "SCENE"} {chapter.num}</span><p>{chapter.body[lang]}</p></motion.aside>
        <motion.div className="cinema-marker" style={{ opacity: detailOpacity }} aria-hidden="true"><b>{chapter.num}</b><span>{chapter.caption[lang]}</span></motion.div>
      </div>
    </section>
  );
}
