import { useLayoutEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Heart, HeartHandshake, MessageCircle, Mic2, Music2, Scissors, Shirt, Sparkles, Users, Utensils, Coffee } from "lucide-react";
import { CULTURE_DIRECTORY, CULTURE_GROUPS } from "@/data/cultureDirectory";
import "./CulturePage.css";

const ICONS = { speech: MessageCircle, book: BookOpen, music: Music2, voices: Mic2, food: Utensils, tea: Coffee, dress: Shirt, craft: Scissors, calendar: CalendarDays, celebration: Sparkles, family: Heart, values: HeartHandshake, people: Users };

export default function CulturePage({ lang = "en" }) {
  const locale = lang === "ru" ? "ru" : "en";
  const ru = locale === "ru";
  const location = useLocation();
  const returnTo = useRef(location.state?.returnTo);
  useLayoutEffect(() => {
    const card = returnTo.current && document.getElementById(`culture-${returnTo.current}`);
    if (card) {
      card.scrollIntoView({ block: "center", behavior: "instant" });
      card.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  return (
    <div className="culture-directory" data-testid="culture-page" lang={locale}>
      <header className="cd-intro">
        <div className="cd-intro-copy">
          <h1 className="page-title" data-testid="culture-title">{ru ? <>Культура <span>и традиции.</span></> : <>Culture <span>& traditions.</span></>}</h1>
          <p className="cd-lead">{ru ? "Выберите тему, чтобы узнать больше." : "Choose a topic. Discover its story."}</p>
        </div>
      </header>

      <section id="culture-topics" className="cd-topics" aria-label={ru ? "Темы культуры" : "Culture topics"}>
        {CULTURE_GROUPS.map((group) => (
          <section className="cd-group" key={group.id} aria-labelledby={`cd-group-${group.id}`}>
            <div className="cd-group-heading"><h2 id={`cd-group-${group.id}`}>{group.title[locale]}</h2></div>
            <div className="cd-grid">
              {CULTURE_DIRECTORY.filter((topic) => topic.group === group.id).map((topic) => {
                const Icon = ICONS[topic.icon];
                return <Link to={`/culture/${topic.id}`} key={topic.id} id={`culture-${topic.id}`} className="cd-card" data-testid={`culture-card-${topic.id}`}>
                  <span className="cd-topic-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.6} /></span>
                  <h3>{topic.title[locale]}</h3>
                  <span className="cd-card-arrow" aria-hidden="true"><ArrowRight size={19} /></span>
                </Link>;
              })}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

export function CultureTopicPage({ lang = "en" }) {
  const { topicId } = useParams();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.getElementById("culture-topic-title")?.focus({ preventScroll: true });
  }, []);
  const locale = lang === "ru" ? "ru" : "en";
  const ru = locale === "ru";
  const topic = CULTURE_DIRECTORY.find((item) => item.id === topicId);
  if (!topic) return <div className="culture-directory cd-reading"><Link className="cd-back" to="/culture"><ArrowLeft size={16} />{ru ? "Все темы культуры" : "All culture topics"}</Link><h1>{ru ? "Тема не найдена" : "Topic not found"}</h1></div>;
  const Icon = ICONS[topic.icon];
  return <article className="culture-directory cd-reading" lang={locale}>
    <Link className="cd-back" to="/culture" state={{ returnTo: topicId }}><ArrowLeft size={16} />{ru ? "Все темы культуры" : "All culture topics"}</Link>
    <div className="cd-reading-header"><span className="cd-topic-icon"><Icon size={24} strokeWidth={1.6} /></span><h1 id="culture-topic-title" tabIndex={-1}>{topic.title[locale]}</h1><p className="cd-reading-deck">{topic.placeholder[locale]}</p></div>
  </article>;
}
