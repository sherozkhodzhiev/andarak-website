import { ABOUT_PAGE } from "@/data/portal";
import { FlowLines, PageIntro, Reveal } from "@/components/portal/MotionKit";

export default function AboutPage({ lang }) {
  return (
    <div className="neo-inner-page" data-testid="about-page">
      <PageIntro index="03 / ABOUT" eyebrow={ABOUT_PAGE.eyebrow[lang]} title={ABOUT_PAGE.title[lang]} lead={lang === "ru" ? "Цифровой дом для памяти, людей и будущего Андарака." : "A digital home for Andarak's memory, people and future."} />
      <section className="about-machine">
        <Reveal className="about-statement"><span>ANDARAK / MMXXVI</span><h2>{lang === "ru" ? "История принадлежит тем, кто продолжает её рассказывать." : "History belongs to those who keep telling it."}</h2></Reveal>
        <div className="about-flow"><FlowLines /></div>
        <div className="about-cards">
          {ABOUT_PAGE.blocks[lang].map(([head, text], i) => (
            <Reveal className="about-card" key={head} delay={i * .06}>
              <span>{String(i + 1).padStart(2, "0")}</span><h3>{head}</h3><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Reveal className="about-pilot" data-testid="about-pilot-note"><span>SYSTEM NOTE</span><p>{ABOUT_PAGE.pilot[lang]}</p></Reveal>
    </div>
  );
}
