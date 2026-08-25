import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { UI } from "@/data/chapters";

const EASE = [0.22, 1, 0.36, 1];

const GLOWS = {
  sogdiana: "radial-gradient(ellipse at 30% 70%, rgba(228,87,46,.20), transparent 55%)",
  invasion: "linear-gradient(160deg, rgba(201,162,39,.14), transparent 60%)",
  alexandria: "linear-gradient(160deg, rgba(201,162,39,.14), transparent 60%)",
  death: "radial-gradient(ellipse at 50% 50%, rgba(107,101,96,.20), transparent 60%)",
  conquest: "radial-gradient(ellipse at 60% 30%, rgba(140,47,47,.26), transparent 55%)",
  samanid: "radial-gradient(ellipse at 50% 40%, rgba(201,162,39,.26), transparent 60%)",
  mongol: "radial-gradient(ellipse at 40% 60%, rgba(140,47,47,.32), transparent 55%)",
  steppe: "radial-gradient(ellipse at 30% 40%, rgba(124,139,111,.22), transparent 55%)",
  empires: "linear-gradient(200deg, rgba(140,47,47,.18), transparent 55%)",
  today: "radial-gradient(ellipse at 50% 30%, rgba(228,87,46,.16), transparent 60%)",
};

function Embers({ seed }) {
  const parts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: `${seed}-${i}`,
        size: 2 + ((i * 37 + seed * 13) % 30) / 10,
        left: ((i * 61 + seed * 17) % 100),
        dur: 6 + ((i * 29 + seed * 7) % 60) / 10,
        delay: ((i * 43 + seed * 11) % 60) / 10,
      })),
    [seed]
  );
  return (
    <div className="embers" aria-hidden="true">
      {parts.map((p) => (
        <span
          key={p.id}
          style={{
            width: p.size, height: p.size, left: `${p.left}%`,
            animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const reveal = (delay) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Chapter({ chapter, index, lang, sectionRef }) {
  const [imgOk, setImgOk] = useState(true);
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section
      ref={sectionRef}
      data-chapter={index + 1}
      data-testid={`chapter-${chapter.num}`}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "125vh", padding: "16vh 8vw", borderBottom: "1px solid rgba(237,227,208,.06)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: GLOWS[chapter.id] }} />
      {chapter.embers && <Embers seed={index + 1} />}

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-start w-full">
        <div className="max-w-[560px] lg:pt-[6vh]">
          <motion.div
            className="font-mono-d text-xs tracking-[.18em] uppercase flex items-center gap-3 mb-6"
            style={{ color: "var(--ember)" }}
            {...reveal(0)}
          >
            <span style={{ color: "var(--parchment-dim)" }}>{chapter.num}</span>
            <span style={{ width: 34, height: 1, background: "var(--parchment-dim)" }} />
            <span data-testid={`eyebrow-${chapter.num}`}>{chapter.eyebrow[lang]}</span>
          </motion.div>

          <motion.h2
            className="font-display font-semibold mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.2rem)", lineHeight: 1.06, color: "var(--parchment)" }}
            data-testid={`title-${chapter.num}`}
            {...reveal(0.12)}
            dangerouslySetInnerHTML={{ __html: chapter.title[lang] }}
          />

          <motion.p
            className="text-sm md:text-base font-light"
            style={{ lineHeight: 1.85, color: "var(--parchment-dim)" }}
            data-testid={`body-${chapter.num}`}
            {...reveal(0.24)}
          >
            {chapter.body[lang]}
          </motion.p>
        </div>

        <div className="lg:sticky" style={{ top: "14vh" }}>
          <motion.figure
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            <div className="art-frame" data-testid={`artwork-${chapter.num}`}>
              {chapter.video && videoOk ? (
                <>
                  <video
                    src={chapter.video}
                    poster={chapter.art}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setVideoOk(false)}
                  />
                  <div className="art-scrim" />
                </>
              ) : imgOk ? (
                <>
                  <img
                    src={chapter.art}
                    alt={chapter.caption[lang]}
                    loading="lazy"
                    onError={() => setImgOk(false)}
                  />
                  <div className="art-scrim" />
                </>
              ) : (
                <div className="art-fallback" style={{ background: GLOWS[chapter.id] }}>
                  <span className="big-numeral">{chapter.num}</span>
                  <span className="font-mono-d text-[11px] tracking-[.08em] uppercase" style={{ color: "var(--parchment-dim)" }}>
                    {UI.artPending[lang]}
                  </span>
                </div>
              )}
            </div>
            <figcaption
              className="font-mono-d text-[10px] mt-3 tracking-[.06em]"
              style={{ color: "var(--muted)" }}
            >
              {chapter.num} / {chapter.caption[lang]}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
