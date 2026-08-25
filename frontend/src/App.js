import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "@/App.css";
import { CHAPTERS, YT_TRACKS } from "@/data/chapters";
import { useAmbience } from "@/hooks/useAmbience";
import { useTrack } from "@/hooks/useTrack";
import { useYouTubeScore } from "@/hooks/useYouTubeScore";
import Hero from "@/components/Hero";
import Chapter from "@/components/Chapter";
import Marquee from "@/components/Marquee";
import Chrome from "@/components/Chrome";

export default function App() {
  const [lang, setLang] = useState("en");
  const [audioOn, setAudioOn] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ytFailed, setYtFailed] = useState({});
  const sectionRefs = useRef([]);
  const activeRef = useRef(0);
  const lastAutoRef = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.35, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.4) {
            const idx = Number(e.target.dataset.chapter);
            activeRef.current = idx;
            setActive(idx);
          }
        });
      },
      { threshold: [0.4] }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    const stop = () => {
      if (Date.now() - lastAutoRef.current > 900) setPlaying(false);
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchmove", stop, { passive: true });
    const timer = setInterval(() => {
      const next = (activeRef.current + 1) % (CHAPTERS.length + 1);
      lastAutoRef.current = Date.now();
      sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth" });
      if (next === CHAPTERS.length) {
        setTimeout(() => setPlaying(false), 8000);
      }
    }, 7500);
    return () => {
      clearInterval(timer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [playing]);

  const chapter = active >= 1 ? CHAPTERS[active - 1] : null;
  const rawYtId = chapter ? YT_TRACKS[chapter.id] : null;
  const ytId = rawYtId && !ytFailed[rawYtId] ? rawYtId : null;
  const trackUrl = !ytId && chapter?.audio ? chapter.audio : null;
  useAmbience(audioOn && !ytId && !trackUrl, chapter ? chapter.sound : "calm");
  useTrack(audioOn, trackUrl);
  useYouTubeScore(audioOn, ytId, useCallback((id) => setYtFailed((f) => (f[id] ? f : { ...f, [id]: true })), []));

  const scrollTo = useCallback((idx) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative" data-testid="andarak-app">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <Chrome
        active={active}
        lang={lang}
        audioOn={audioOn}
        playing={playing}
        onLang={() => setLang((l) => (l === "en" ? "ru" : "en"))}
        onAudio={() => setAudioOn((a) => !a)}
        onPlay={() => setPlaying((p) => !p)}
        onDot={scrollTo}
      />

      <Hero lang={lang} sectionRef={(el) => (sectionRefs.current[0] = el)} />
      <Marquee lang={lang} />

      {CHAPTERS.map((c, i) => (
        <Chapter
          key={c.id}
          chapter={c}
          index={i}
          lang={lang}
          sectionRef={(el) => (sectionRefs.current[i + 1] = el)}
        />
      ))}

      <footer
        className="relative flex flex-col items-center justify-center text-center"
        style={{ minHeight: "55vh", background: "radial-gradient(ellipse at 50% 100%, rgba(228,87,46,.12), transparent 60%)" }}
      >
        <p className="font-display italic" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", color: "var(--parchment)" }} data-testid="footer-line">
          {lang === "en" ? "The fire is still burning." : "Огонь всё ещё горит."}
        </p>
        <p className="font-mono-d text-[10px] tracking-[.2em] uppercase mt-6" style={{ color: "var(--muted)" }}>
          Andarak — {lang === "en" ? "a history in fire" : "история в огне"} — MMXXVI
        </p>
      </footer>
    </div>
  );
}
