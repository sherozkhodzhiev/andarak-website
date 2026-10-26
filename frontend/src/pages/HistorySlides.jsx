import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { CHAPTERS, UI, YT_TRACKS } from "@/data/chapters";
import ReadingMusic from "@/components/ReadingMusic";
import "./HistorySlides.css";

const SUMMARIES = [
  ["Belief, light, and the world before Alexander.", "Вера, свет и мир до Александра."],
  ["An advancing empire meets Sogdian resistance.", "Наступающая империя встречает сопротивление Согдианы."],
  ["A city at the meeting point of two worlds.", "Город на пересечении двух миров."],
  ["The story of seven families and the search for a home.", "История семи семей и поисков родного дома."],
  ["A king’s life ends. The work of rebuilding continues.", "Жизнь царя заканчивается. Восстановление продолжается."],
  ["Conquest, changing beliefs, and the memory of what came before.", "Завоевание, перемена веры и память о прошлом."],
  ["Language, poetry, and learning in the Samanid age.", "Язык, поэзия и знания в эпоху Саманидов."],
  ["The cities of Transoxiana face the Mongol invasion.", "Города Мавераннахра встречают монгольское нашествие."],
  ["New boundaries and the identity people carry with them.", "Новые границы и самобытность, которую хранят люди."],
  ["A living home. An inheritance for the next generation.", "Живой дом. Наследие для следующего поколения."],
];

export default function HistorySlides({ lang, onLang }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const root = useRef(null);
  const music = useRef(null);
  const triggers = useRef({});
  const closeButton = useRef(null);
  const ru = lang === "ru";
  const slides = [
    { id: "opening", art: CHAPTERS[0].art, title: ru ? "АНДАРАК" : "ANDARAK", eyebrow: UI.kicker[lang], summary: UI.heroSub[lang], body: UI.heroIntro[lang] },
    ...CHAPTERS.map((c, i) => ({ ...c, title: c.title[lang], eyebrow: c.eyebrow[lang], summary: SUMMARIES[i][ru ? 1 : 0], body: c.body[lang], lesson: c.cue[lang] })),
    { id: "closing", art: CHAPTERS[CHAPTERS.length - 1].art, title: ru ? "Огонь всё ещё <em>горит.</em>" : "The fire is still <em>burning.</em>", eyebrow: ru ? "Продолжение — в наших руках" : "The next chapter is ours", summary: ru ? "Андарак: история в огне." : "Andarak: a history in fire." },
  ];

  useEffect(() => {
    const scroller = root.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => setReduced(motion.matches);
    preference();
    motion.addEventListener("change", preference);
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const value = Math.min(CHAPTERS.length + 1, scroller.scrollTop / (scroller.clientHeight * 1.8));
        setProgress(value);
        setActive(Math.min(CHAPTERS.length + 1, Math.floor(value + 0.18)));
      });
    };
    scroller.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(scroller);
    update();
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", update);
      motion.removeEventListener("change", preference);
      resize.disconnect();
    };
  }, []);

  useEffect(() => { setExpanded(null); }, [active]);

  useEffect(() => {
    if (expanded !== null) closeButton.current?.focus();
  }, [expanded]);

  function close() {
    const previous = expanded;
    music.current?.stop();
    setExpanded(null);
    triggers.current[previous]?.focus();
  }

  function go(index) {
    setExpanded(null);
    root.current?.scrollTo({ top: index * root.current.clientHeight * 1.8, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div className="history-cinema" lang={lang}>
      <header className="hc-header">
        <Link to="/" aria-label={ru ? "Назад на главную" : "Back to the village"}><ArrowLeft size={16} /> <span>{ru ? "Назад" : "Back"}</span></Link>
        <button onClick={onLang} aria-label={ru ? "Switch to English" : "Переключить на русский"}>{ru ? "EN" : "RU"}</button>
      </header>

      <main className="hc-scroll" ref={root} style={{ overflowY: expanded !== null ? "hidden" : "auto" }} aria-label={ru ? "История Андарака" : "History of Andarak"}>
        <div className="hc-track" style={{ height: `${100 + (slides.length - 1) * 180}%` }}>
        <div className="hc-stage">
        {slides.map((slide, index) => {
          const offset = progress - index;
          const exiting = Math.max(0, Math.min(1, offset));
          const entering = Math.max(0, Math.min(1, (offset + 0.35) / 0.35));
          const fade = Math.max(0, Math.min(1, (1 - exiting) / 0.35));
          const visible = offset >= -0.35 && offset < 1;
          const resting = expanded === slide.id;
          const zoom = Math.max(0, (exiting - 0.12) / 0.88);
          return (
          <section key={slide.id} data-slide={index} inert={active !== index ? true : undefined} aria-hidden={active !== index} style={{ visibility: visible ? "visible" : "hidden", opacity: reduced ? (active === index ? 1 : 0) : entering * fade, zIndex: index, pointerEvents: active === index ? "auto" : "none", "--image-scale": reduced || resting ? 1 : 1 + zoom * 1.65, "--title-scale": reduced || resting ? 1 : 1 + zoom * 2.5, "--copy-opacity": reduced || resting ? 1 : Math.max(0, 1 - zoom * 1.5) }} className={`hc-slide ${active === index ? "is-active" : ""}`} aria-labelledby={`hc-title-${slide.id}`}>
            {slide.id === "opening" ? (
              <div className="hc-bookend hc-opening">
                <p className="hc-eyebrow">{UI.kicker[lang]}</p>
                <h1 id="hc-title-opening">{ru ? "АНДАРАК" : "ANDARAK"}</h1>
                <p className="hc-opening-motto">{UI.heroSub[lang]}</p>
                <div className="hc-opening-text" tabIndex={0} aria-label={ru ? "Вступление" : "Introduction"}><p>{UI.heroIntro[lang]}</p></div>
                <button className="hc-start" onClick={() => go(1)}>{ru ? "Начать историю" : "Begin the story"}<ArrowRight size={18} /></button>
              </div>
            ) : slide.id === "closing" ? (
              <div className="hc-bookend hc-ending"><h1 id="hc-title-closing">{ru ? "Огонь всё ещё горит." : "The fire is still burning."}</h1></div>
            ) : (<>
            <div className="hc-art"><img src={slide.art} alt="" loading={index === 1 ? "eager" : "lazy"} /></div>
            <div className="hc-copy">
              <p className="hc-eyebrow"><span>{index === 0 ? "00" : String(index).padStart(2, "0")}</span> — {slide.eyebrow}</p>
              <h1 id={`hc-title-${slide.id}`} dangerouslySetInnerHTML={{ __html: slide.title }} />
              <p className="hc-summary">{slide.summary}</p>
              {slide.body ? (
                <button className="hc-more" ref={(el) => { triggers.current[slide.id] = el; }} aria-expanded={expanded === slide.id} aria-controls={`hc-reading-${slide.id}`} onClick={() => { music.current?.start(); setExpanded(slide.id); }}>
                  <span>{ru ? "Подробнее" : "Learn more"}</span><span className="hc-circle"><Plus size={22} /></span>
                </button>
              ) : <Link className="hc-more" to="/">{ru ? "Вернуться в село" : "Back to the village"}<ArrowRight size={20} /></Link>}
            </div>

            </>)}
            {active === index && YT_TRACKS[slide.id] && <ReadingMusic ref={music} videoId={YT_TRACKS[slide.id]} lang={lang} enabled={expanded === slide.id} controlId={`hc-sound-${slide.id}`} />}
            {expanded === slide.id && (
              <div className="hc-reading" id={`hc-reading-${slide.id}`} role="region" aria-label={`${ru ? "Подробнее" : "Learn more"}: ${slide.title.replace(/<[^>]+>/g, "")}`} onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } }}>
                <div className="hc-reading-header"><span>{slide.eyebrow}</span><div className="hc-reading-actions"><span id={`hc-sound-${slide.id}`} /><button ref={closeButton} onClick={close} aria-label={ru ? "Закрыть текст" : "Close text"}><X size={22} /></button></div></div>
                <div className="hc-reading-scroll" tabIndex={0} key={`${slide.id}-${lang}`}>
                  <h2 dangerouslySetInnerHTML={{ __html: slide.title }} />
                  <p>{slide.body}</p>
                  {slide.lesson && <aside><h3>{UI.score[lang]}</h3><p>{slide.lesson}</p></aside>}
                </div>
              </div>
            )}
          </section>
        );})}
        </div>
        </div>
      </main>

      <nav className="hc-navigation" aria-label={ru ? "Навигация по слайдам" : "Slide navigation"}>
        <span aria-hidden="true" />
        <span className="hc-scroll-hint">{ru ? "Листайте историю" : "Scroll through history"} <ArrowDown size={13} /></span>
        <div><button disabled={active === 0} onClick={() => go(active - 1)} aria-label={ru ? "Предыдущий слайд" : "Previous slide"}><ArrowLeft size={19} /></button><button disabled={active === slides.length - 1} onClick={() => go(active + 1)} aria-label={ru ? "Следующий слайд" : "Next slide"}><ArrowRight size={19} /></button></div>
      </nav>
    </div>
  );
}
