import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { T } from "@/data/portal";
import { EASE, KineticText, Reveal } from "@/components/portal/MotionKit";

const COPY = {
  ru: { issue: "ЖИВОЙ АРХИВ • 2026", scroll: "Листайте, чтобы войти", chapter: "История не стоит на месте", chapterText: "Десять эпох раскрываются как кинематографическая последовательность — с оригинальными изображениями, голосом и музыкой.", culture: "Культура — это то, что движется вместе с нами", cultureText: "Язык, Навруз, музыка, одежда и правила гостеприимства — не экспонаты, а живая система.", archive: "Наблюдать. Сохранять. Передавать.", archiveText: "Фотоархив настоящего Андарака: улицы, сезоны, память и лица места.", open: "Открыть главу", gallery: "Смотреть архив" },
  en: { issue: "A LIVING ARCHIVE • 2026", scroll: "Scroll to enter", chapter: "History refuses to stand still", chapterText: "Ten eras unfold as a cinematic sequence — with original imagery, voice and music.", culture: "Culture is what moves with us", cultureText: "Language, Nowruz, music, dress and hospitality are not exhibits. They are a living system.", archive: "Observe. Preserve. Pass it on.", archiveText: "A visual archive of Andarak now: its streets, seasons, memory and sense of place.", open: "Open chapter", gallery: "View archive" },
};

export default function HomePage({ lang }) {
  const c = COPY[lang];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <div className="neo-home" data-testid="home-page">
      <section ref={heroRef} className="neo-hero" data-testid="home-hero">
        <div className="neo-hero-meta"><span>{c.issue}</span><span>39.78° N / 69.63° E</span></div>
        <motion.div className="neo-hero-image" style={{ y: imageY }}><img src="/gallery/hero-valley.jpg" alt="Andarak valley" /></motion.div>
        <div className="neo-hero-noise" />
        <motion.div className="neo-hero-title" style={{ x: titleX }}><KineticText>ANDARAK</KineticText><p>{T.heroSlogan[lang]}</p></motion.div>
        <motion.div className="neo-hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <p>{T.heroLead[lang]}</p><a href="#enter" className="neo-scroll-cue"><span>{c.scroll}</span><ArrowDownRight /></a>
        </motion.div>
      </section>

      <section id="enter" className="neo-manifesto">
        <div className="neo-manifesto-index">{lang === 'ru' ? 'НАШ ДОМ' : 'OUR HOME'}</div>
        <Reveal className="neo-manifesto-copy"><p className="neo-eyebrow">{lang === 'ru' ? 'АНДАРАК / ЛЮДИ И МЕСТО' : 'ANDARAK / PEOPLE & PLACE'}</p><h2>{lang === "ru" ? "Место, которое" : "A place to belong."}<br/><em>{lang === "ru" ? "мы зовём домом." : "Stories to share."}</em></h2><p className="calm-introduction">{lang === 'ru' ? 'Знакомьтесь с Андараком через его людей, традиции и повседневную жизнь. Здесь мы бережно собираем то, что связывает нас с домом.' : 'Get to know Andarak through its people, traditions and everyday life. A shared space for the memories and small details that connect us to home.'}</p></Reveal>
      </section>

      <section className="neo-feature neo-feature-dark">
        <div className="neo-sticky-label"><span>02</span><span>HISTORY / FIRE</span></div>
        <div className="neo-feature-media"><motion.img src="/art/journey-2.jpg" alt="Sogdian history" whileHover={{ scale: 1.025 }} transition={{ duration: 0.8, ease: EASE }} /><span className="pixel-tag" data-text="2500 YEARS">2500 YEARS</span></div>
        <Reveal className="neo-feature-copy"><h2>{c.chapter}</h2><p>{c.chapterText}</p><Link to="/history" className="neo-link">{c.open}<ArrowUpRight /></Link></Reveal>
      </section>

      <section className="neo-feature neo-feature-light neo-feature-reverse">
        <div className="neo-sticky-label"><span>03</span><span>CULTURE / NOW</span></div>
        <div className="neo-feature-media neo-culture-collage"><img src="/art/journey-4.jpg" alt="Nowruz celebration" /><img src="/gallery/village-street.webp" alt="Village street" /></div>
        <Reveal className="neo-feature-copy"><h2>{c.culture}</h2><p>{c.cultureText}</p><Link to="/culture" className="neo-link">{T.heroSecondary[lang]}<ArrowUpRight /></Link></Reveal>
      </section>

      <section className="neo-archive-band">
        <Reveal className="neo-archive-heading"><span>04 / FIELD NOTES</span><h2>{c.archive}</h2></Reveal>
        <div className="neo-filmstrip">
          {["/gallery/mosque-winter.png", "/gallery/valley-green.png", "/gallery/memorial-arch.png", "/gallery/winter-street.png"].map((src, i) => (
            <motion.figure key={src} initial={{ opacity: 0, y: 90, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .9, delay: i * .08, ease: EASE }}><img src={src} alt="Andarak archive" loading="lazy" /><figcaption>0{i + 1} / ANDARAK</figcaption></motion.figure>
          ))}
        </div>
        <div className="neo-archive-action"><p>{c.archiveText}</p><Link to="/gallery" className="neo-link">{c.gallery}<ArrowUpRight /></Link></div>
      </section>
    </div>
  );
}
