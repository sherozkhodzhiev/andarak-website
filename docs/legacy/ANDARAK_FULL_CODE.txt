# ANDARAK — A History in Fire · Complete Source Code

All code powering the web app presentation. Structure: React (CRA) + Tailwind + framer-motion + lenis. Static assets (images/videos) live in `frontend/public/art` and `frontend/public/gallery`.

---

## `frontend/public/index.html`

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#14110F" />
        <meta name="description" content="Andarak — A History in Fire. Ten chapters, two and a half thousand years, one village in the Fergana valley." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
        -->
        <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
        -->
        <title>Andarak — A History in Fire</title>
        <script>window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);</script>
        <script src="https://assets.emergent.sh/scripts/emergent-main.js"></script>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
        <script>
            !(function (t, e) {
                var o, n, p, r;
                e.__SV ||
                    ((window.posthog = e),
                    (e._i = []),
                    (e.init = function (i, s, a) {
                        function g(t, e) {
                            var o = e.split(".");
                            2 == o.length && ((t = t[o[0]]), (e = o[1])),
                                (t[e] = function () {
                                    t.push(
                                        [e].concat(
                                            Array.prototype.slice.call(
                                                arguments,
                                                0,
                                            ),
                                        ),
                                    );
                                });
                        }
                        ((p = t.createElement("script")).type =
                            "text/javascript"),
                            (p.crossOrigin = "anonymous"),
                            (p.async = !0),
                            (p.src =
                                s.api_host.replace(
                                    ".i.posthog.com",
                                    "-assets.i.posthog.com",
                                ) + "/static/array.js"),
                            (r =
                                t.getElementsByTagName(
                                    "script",
                                )[0]).parentNode.insertBefore(p, r);
                        var u = e;
                        for (
                            void 0 !== a ? (u = e[a] = []) : (a = "posthog"),
                                u.people = u.people || [],
                                u.toString = function (t) {
                                    var e = "posthog";
                                    return (
                                        "posthog" !== a && (e += "." + a),
                                        t || (e += " (stub)"),
                                        e
                                    );
                                },
                                u.people.toString = function () {
                                    return u.toString(1) + ".people (stub)";
                                },
                                o =
                                    "init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(
                                        " ",
                                    ),
                                n = 0;
                            n < o.length;
                            n++
                        )
                            g(u, o[n]);
                        e._i.push([i, s, a]);
                    }),
                    (e.__SV = 1));
            })(document, window.posthog || []);
            posthog.init("phc_DbsPb39SRc8z3EiQ6Dhj6ikv4H4rTKcht9d4sZSesceP", {
                api_host: "https://ap.emergent.sh",
                person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well,
                session_recording: {
                    recordCrossOriginIframes: true,
                    capturePerformance: false,
                },
            });
        </script>
    </body>
</html>

```

---

## `frontend/src/index.js`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

```

---

## `frontend/src/App.js`

```jsx
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
import Gallery from "@/components/Gallery";
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

      <Gallery lang={lang} />

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

```

---

## `frontend/src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Vazirmatn:wght@200;300;400;600&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #14110F;
  --ink-2: #0B0A08;
  --parchment: #EDE3D0;
  --parchment-dim: #B7AD97;
  --muted: #8A8170;
  --ember: #E4572E;
  --ember-dim: #7A3016;
  --ash: #6B6560;
  --gold: #C9A227;
  --steppe: #7C8B6F;
  --soviet: #8C2F2F;
}

html { scroll-behavior: auto; }

body {
  margin: 0;
  background: var(--ink);
  color: var(--parchment);
  font-family: 'Vazirmatn', sans-serif;
  font-weight: 300;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--ember); color: var(--ink); }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ink-2); }
::-webkit-scrollbar-thumb { background: #3a332c; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--ember-dim); }

.font-display { font-family: 'Cormorant Garamond', serif; }
.font-mono-d { font-family: 'JetBrains Mono', monospace; }

/* ---------- grain & vignette ---------- */
.grain-overlay {
  position: fixed; inset: 0; z-index: 90; pointer-events: none;
  opacity: .06; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.vignette {
  position: fixed; inset: 0; z-index: 89; pointer-events: none;
  box-shadow: inset 0 0 22vw rgba(0,0,0,.55);
}

/* ---------- kinetic hero ---------- */
.mask-line { display: block; overflow: hidden; }
.mask-line > span { display: block; will-change: transform; }
.hero-ghost {
  position: absolute; top: 50%; left: 50%;
  font-family: 'Cormorant Garamond', serif; font-weight: 600;
  font-size: 22vw; line-height: 1; letter-spacing: .04em; white-space: nowrap;
  color: transparent; -webkit-text-stroke: 1px rgba(237,227,208,.07);
  pointer-events: none; user-select: none;
}

/* ---------- flame ---------- */
@keyframes flicker {
  0%, 100% { transform: scaleY(1) scaleX(1); }
  25% { transform: scaleY(1.07) scaleX(.96); }
  50% { transform: scaleY(.94) scaleX(1.04); }
  75% { transform: scaleY(1.04) scaleX(.98); }
}
@keyframes emberpulse {
  0%, 100% { opacity: .35; transform: scale(.96); }
  50% { opacity: .7; transform: scale(1); }
}
.flame-alive { animation: flicker 2.6s ease-in-out infinite; transform-origin: 50% 100%; }
.flame-dying { animation: flicker 1.1s ease-in-out infinite; transform-origin: 50% 100%; }
.flame-ember { animation: emberpulse 5s ease-in-out infinite; transform-origin: 50% 100%; }
.flame-reborn { animation: flicker 1.9s ease-in-out infinite; transform-origin: 50% 100%; }

/* ---------- embers ---------- */
.embers { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.embers span {
  position: absolute; bottom: -10px; border-radius: 50%;
  background: var(--ember); opacity: .55;
  animation: rise linear infinite;
}
@keyframes rise {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: .6; }
  100% { transform: translateY(-115vh) translateX(24px); opacity: 0; }
}

/* ---------- marquee ---------- */
.marquee-track {
  display: flex; width: max-content;
  animation: marquee 70s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ---------- art frame ---------- */
.art-frame {
  position: relative; width: 100%; aspect-ratio: 4 / 3;
  border: 1px solid rgba(201,162,39,.35);
  background: var(--ink-2);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,.55);
}
.art-frame::after {
  content: ''; position: absolute; inset: 10px;
  border: 1px solid rgba(237,227,208,.14); pointer-events: none; z-index: 3;
}
.art-frame img, .art-frame video {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover;
  animation: kenburns 26s ease-in-out infinite alternate;
}
.art-frame .art-scrim {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(to top, rgba(11,10,8,.55), transparent 40%);
}
@keyframes kenburns {
  from { transform: scale(1) translate(0, 0); }
  to { transform: scale(1.12) translate(-1.5%, -1.5%); }
}
.art-fallback {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px; text-align: center;
  padding: 24px;
}
.art-fallback .big-numeral {
  font-family: 'Cormorant Garamond', serif; font-size: 6rem; line-height: 1;
  color: rgba(237,227,208,.14); font-weight: 600;
}

/* ---------- village gallery ---------- */
.gallery-wall {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-flow: dense;
  gap: 28px;
}
.gallery-item { grid-column: span 2; margin: 0; }
.gallery-item.g-wide { grid-column: span 4; }
.gallery-item.g-tall { grid-column: span 2; grid-row: span 2; }
.gallery-frame {
  position: relative; width: 100%; height: 100%;
  min-height: 260px;
  border: 1px solid rgba(201,162,39,.35);
  background: var(--ink-2);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,.55);
}
.gallery-item.g-tall .gallery-frame { height: calc(100% - 30px); }
.gallery-item.g-tall .gallery-frame img { object-position: 50% 12%; }
.gallery-frame::after {
  content: ''; position: absolute; inset: 10px;
  border: 1px solid rgba(237,227,208,.14); pointer-events: none; z-index: 3;
}
.gallery-frame img {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.4s cubic-bezier(.22,1,.36,1), filter 1.4s ease;
  filter: saturate(.92);
}
.gallery-item:hover .gallery-frame img { transform: scale(1.09); filter: saturate(1.05); }
.gallery-scrim {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(to top, rgba(11,10,8,.45), transparent 35%);
}
@media (max-width: 900px) {
  .gallery-wall { grid-template-columns: 1fr; gap: 34px; }
  .gallery-item, .gallery-item.g-wide, .gallery-item.g-tall { grid-column: span 1; grid-row: auto; }
  .gallery-frame { min-height: 220px; aspect-ratio: 4 / 3; height: auto; }
  .gallery-item.g-tall .gallery-frame { height: auto; }
}

/* ---------- controls ---------- */
.ctrl-btn {
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  letter-spacing: .1em; text-transform: uppercase;
  color: var(--parchment);
  background: rgba(20,17,15,.55);
  border: 1px solid rgba(237,227,208,.28);
  padding: 8px 14px; cursor: pointer;
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  transition: border-color .3s ease, color .3s ease, transform .2s ease;
  display: inline-flex; align-items: center; gap: 8px;
}
.ctrl-btn:hover { border-color: var(--ember); color: var(--ember); transform: translateY(-1px); }

/* ---------- scroll hint ---------- */
@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
.scroll-hint { animation: bob 2.2s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .art-frame img, .flame-alive, .flame-dying, .flame-ember, .flame-reborn,
  .embers span, .scroll-hint { animation: none !important; }
  .marquee-track { animation-duration: 200s; }
}

```

---

## `frontend/src/App.css`

```css
/* Andarak — A History in Fire */

```

---

## `frontend/src/data/chapters.js`

```jsx
const FIRE_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/b/bb/Fantastic-fireplace-fire-chimney-hearth-_background_-_texture_-_motion_graphics_-_free_video_library.webm";
const WHEAT_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/a/af/ASMR_field_of_wheat_-_nature.webm";

export const CHAPTERS = [
  {
    id: "sogdiana", num: "01", flame: "alive", sound: "fire", embers: true,
    art: "/art/01-sogdiana.png", video: FIRE_VIDEO, audio: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Ustad_Gada_Mohammad_-_Rababa.ogg",
    eyebrow: { en: "Sogdiana, before empire", ru: "Согдиана, до империй" },
    title: { en: "A Land of <em>Fire</em>", ru: "Земля <em>Огня</em>" },
    body: {
      en: "Before empires, before conquerors — this was Sogdiana. Golden light over the Fergana valley, smoke rising from an eternal flame inside a stone temple. Priests in white tend the fire; villagers bow, offer bread and water. A people who worshipped light, and called it Ahura Mazda.",
      ru: "До империй и завоевателей это была Согдиана. Золотой свет над Ферганской долиной, дым вечного огня в каменном храме. Жрецы в белых одеждах поддерживают пламя; жители приносят хлеб и воду. Народ, поклонявшийся свету и звавший его Ахура Мазда.",
    },
    caption: {
      en: "Sogdian priests in white robes tending the sacred fire-altar, clay homes behind",
      ru: "Согдийские жрецы в белых одеждах у священного алтаря огня",
    },
    cue: { en: "Sacred, meditative — soft flute, deep drone, distant temple bells", ru: "Священно, медитативно — тихая флейта, гул, далёкие колокола" },
  },
  {
    id: "invasion", num: "02", flame: "alive", sound: "storm", embers: false,
    art: "/art/02-invasion.png", audio: "https://upload.wikimedia.org/wikipedia/commons/9/97/02_Taiko2_%28short%29.oga",
    eyebrow: { en: "329 BC", ru: "329 г. до н.э." },
    title: { en: "Alexander <em>Invades</em>", ru: "Вторжение <em>Александра</em>" },
    body: {
      en: "Dust rises on the horizon. Greek phalanxes cross the Jaxartes. Sogdian horsemen resist fiercely, led by Spitamenes' guerrilla raids. A young king from Macedon has crossed the world to claim this land — it will not fall quietly.",
      ru: "Пыль поднимается на горизонте. Греческие фаланги пересекают Яксарт. Согдийские всадники отчаянно сопротивляются под руководством Спитамена. Молодой царь Македонии пересёк мир, чтобы захватить эту землю — но она не сдастся без боя.",
    },
    caption: {
      en: "Sogdian horse-archers clash with Macedonian bronze phalanxes",
      ru: "Согдийские конные лучники против македонских фаланг",
    },
    cue: { en: "Battle drums, rising brass — tension before the clash", ru: "Боевые барабаны, нарастающее напряжение" },
  },
  {
    id: "alexandria", num: "03", flame: "alive", sound: "wind", embers: false,
    art: "/art/03-alexandria.png",
    eyebrow: { en: "Khujand", ru: "Худжанд" },
    title: { en: "Alexandria <em>Eschate</em>", ru: "Александрия <em>Крайняя</em>" },
    body: {
      en: "On the river's edge, new walls rise from Sogdian soil. Greek and local stonemasons work side by side, column and native form fused into one. At the furthest edge of his known world, Alexander built a city — 'the Furthest' — Greek stone on Sogdian earth.",
      ru: "На берегу реки из согдийской земли поднимаются новые стены. Греческие и местные каменщики работают бок о бок. На самом краю известного ему мира Александр построил город — «Крайний» — греческий камень на согдийской земле.",
    },
    caption: {
      en: "Hellenistic pillars and fortresses rise beside Sogdian settlements",
      ru: "Эллинистические колонны рядом с согдийскими домами",
    },
    cue: { en: "Triumphant but uneasy brass, fading into something solemn", ru: "Триумфальная, но тревожная музыка строительства" },
  },
  {
    id: "death", num: "04", flame: "alive", sound: "calm", embers: false,
    art: "/art/04-death.png", video: WHEAT_VIDEO, audio: null,
    eyebrow: { en: "323 BC", ru: "323 г. до н.э." },
    title: { en: "The King Dies, the Land <em>Breathes</em>", ru: "Царь Умирает, Земля <em>Вздыхает</em>" },
    body: {
      en: "Alexander died young in Babylon, his generals dividing the map he left behind. Far from the throne rooms, Sogdiana's fire temples still burned, untouched — and the land quietly returned to itself.",
      ru: "Александр умер молодым в Вавилоне, и его полководцы разделили оставленную им карту. Вдали от тронных залов храмы огня Согдианы всё так же горели, нетронутые — и земля тихо вернулась к своей жизни.",
    },
    caption: {
      en: "Sogdian farmers harvest beneath the cliffs as garrisons withdraw",
      ru: "Согдийские дехкане собирают урожай, гарнизоны уходят",
    },
    cue: { en: "Mournful strings — a lone duduk, sparse and slow", ru: "Скорбные струны — одинокий дудук" },
  },
  {
    id: "conquest", num: "05", flame: "dying", sound: "fire", embers: true,
    art: "/art/05-conquest.png", video: FIRE_VIDEO, audio: null,
    eyebrow: { en: "8th century", ru: "VIII век" },
    title: { en: "The Fires Are <em>Put Out</em>", ru: "Огни <em>Угасают</em>" },
    body: {
      en: "Arab armies swept across Transoxiana under the banners of the caliphate. Fire temples burned — not with sacred flame now, but with conquest. Nobles and scholars resisted, then fell. Old symbols were chiselled from the walls. Villagers knelt in the shadow of new minarets, rising where fire-altars once stood. Islam took root in blood and prayer.",
      ru: "Арабские армии прошлись по Мавераннахру под знамёнами халифата. Храмы огня горели — теперь не священным пламенем, а огнём завоевания. Старые символы сбивали со стен. Жители склонялись в тени новых минаретов, поднявшихся на месте алтарей. Ислам укоренился в крови и молитвах.",
    },
    caption: {
      en: "Arab cavalry enters the stone towns; altars extinguished, first minarets rise",
      ru: "Арабская конница входит в города; потушенные алтари, первые минареты",
    },
    cue: { en: "Dark war drums building to violence — then abrupt silence", ru: "Тёмные барабаны войны — и внезапная тишина" },
  },
  {
    id: "samanid", num: "06", flame: "reborn", sound: "calm", embers: true,
    art: "/art/06-samanid.png",
    eyebrow: { en: "9th–10th century", ru: "IX–X века" },
    title: { en: "A Golden Age, <em>Reborn</em>", ru: "Золотой Век, <em>Возрождение</em>" },
    body: {
      en: "Generations later, a Persian dynasty rose from the same soil — ruling now in the name of Islam, but reviving Persian language and science. Bukhara's domes glowed at dawn; Avicenna bent over manuscripts, astronomers charted the stars, Rudaki recited verse at court. Out of conquest, a civilization of medicine, philosophy, and poetry — wrapped in a new faith.",
      ru: "Спустя поколения персидская династия Саманидов поднялась на этой же земле, возродив персидский язык и науки. Купола Бухары сияли на рассвете; Ибн Сина работал над рукописями, астрономы изучали звёзды, Рудаки читал стихи. Из завоеваний родилась цивилизация медицины, философии и поэзии.",
    },
    caption: {
      en: "Scholars, poets and architects in Samanid Bukhara at dawn",
      ru: "Учёные, поэты и зодчие Бухары эпохи Саманидов",
    },
    cue: { en: "Elegant and victorious — oud, strings, a hopeful rising melody", ru: "Изящно и победно — уд, струны, светлая мелодия" },
  },
  {
    id: "mongol", num: "07", flame: "dying", sound: "storm", embers: true,
    art: "/art/07-mongol.png",
    eyebrow: { en: "1219", ru: "1219 год" },
    title: { en: "The Mongols <em>Arrive</em>", ru: "Нашествие <em>Монголов</em>" },
    body: {
      en: "Genghis Khan's horsemen pour across the steppe. Bukhara and Samarkand burn. The same libraries filled with science and poetry are put to the torch. Ash falls like snow — a civilization built over centuries falls in weeks.",
      ru: "Всадники Чингисхана хлынули через степь. Бухара и Самарканд горят. Библиотеки, полные книг по науке и поэзии, преданы огню. Пепел падает как снег — цивилизация, строившаяся веками, рушится за считаные недели.",
    },
    caption: {
      en: "Mongol horse-archers against burning citadels and collapsing gates",
      ru: "Монгольские конники на фоне горящих цитаделей",
    },
    cue: { en: "Thunderous drums, screaming brass, chaos — the darkest cue", ru: "Громовые барабаны, хаос — самая тёмная глава" },
  },
  {
    id: "steppe", num: "08", flame: "ember", sound: "wind", embers: false,
    art: "/art/08-steppe.png",
    eyebrow: { en: "13th–16th century", ru: "XIII–XVI века" },
    title: { en: "New Peoples, <em>New Roots</em>", ru: "Новые Народы, <em>Новые Корни</em>" },
    body: {
      en: "Generations pass. Turkic and Mongolic tribes settle the land, intermarry, adopt Persian-Islamic culture. New khanates rise — the Bukhara Khanate carries old traditions forward in new hands. Markets bustle again; caravans move silk and spice.",
      ru: "Проходят поколения. Тюркские и монгольские племена селятся на этой земле, смешиваются с местным населением и перенимают персидско-исламскую культуру. Поднимаются новые ханства, рынки снова шумят, а караваны везут шёлк и специи.",
    },
    caption: {
      en: "Yurts beside mountain villages; Silk Road caravans trade silk and spice",
      ru: "Юрты рядом с горными селениями, караваны Шёлкового пути",
    },
    cue: { en: "Steppe strings — horsehead fiddle, slowly turning warm", ru: "Струнные степи — тепло и размеренно" },
  },
  {
    id: "empires", num: "09", flame: "ember", sound: "calm", embers: false,
    art: "/art/09-empires.jpg", audio: null,
    eyebrow: { en: "19th–20th century", ru: "XIX–XX века" },
    title: { en: "Empires Draw <em>the Lines</em>", ru: "Империи Чертят <em>Границы</em>" },
    body: {
      en: "Russian imperial troops arrive with maps and rifles; the Tsar's flag gives way to the hammer and sickle. In 1924, Soviet cartographers bend over a table, pencils cutting through valleys and villages that never had borders — carving Central Asia into republics. Andarak, a Tajik-Persian village, ends up inside the new Kyrgyz SSR.",
      ru: "Войска Российской империи приходят с картами и ружьями; флаг царя уступает место серпу и молоту. В 1924 году советские картографы чертят границы прямо по долинам и деревням. Андарак, таджикско-персидское село, оказывается в составе Киргизской ССР.",
    },
    caption: {
      en: "Samarkand in the final years of the Emirate — colour photograph by S. Prokudin-Gorsky, c. 1911",
      ru: "Самарканд в последние годы эмирата — цветная фотография С. Прокудина-Горского, ок. 1911",
    },
    cue: { en: "Cold imperial march fading into bureaucratic quiet", ru: "Холодный марш, растворяющийся в тишине кабинетов" },
  },
  {
    id: "today", num: "10", flame: "alive", sound: "birds", embers: true,
    art: "/art/10-today.jpg", audio: null,
    eyebrow: { en: "Today", ru: "Наши дни" },
    title: { en: "Andarak <em>Still Stands</em>", ru: "Андарак <em>Всё Ещё Стоит</em>" },
    body: {
      en: "After Sogdians, Greeks, Arabs, Samanids, Mongols, Turkic khanates, empires and unions — the village is still here. Mountains, homes, daily life, children, elders. This is where I am from.",
      ru: "После согдийцев, греков, арабов, саманидов, монголов, тюркских ханов, империй и союзов — село всё ещё здесь. Горы, дома, повседневная жизнь, дети и аксакалы. Это моё родное место.",
    },
    caption: {
      en: "Andarak — the village today, from the author's archive",
      ru: "Андарак — село сегодня, фото из архива автора",
    },
    cue: { en: "Warm and hopeful — the flute from chapter one returns", ru: "Тепло и светло — возвращается флейта первой главы" },
  },
];

export const FLAME_STATES = {
  alive:  { color: "#E4572E", cls: "flame-alive",  label: { en: "the fire — alive", ru: "огонь — жив" } },
  dying:  { color: "#8C2F2F", cls: "flame-dying",  label: { en: "the fire — burning cities", ru: "огонь — пожар городов" } },
  ember:  { color: "#8A8170", cls: "flame-ember",  label: { en: "the fire — an ember, remembered", ru: "огонь — тлеющий уголь" } },
  reborn: { color: "#C9A227", cls: "flame-reborn", label: { en: "the fire — reborn, transformed", ru: "огонь — возрождён" } },
};

export const UI = {
  kicker: { en: "A history of Andarak", ru: "История Андарака" },
  heroName: { en: "ANDARAK", ru: "АНДАРАК" },
  heroSub: {
    en: "Fire, Empire, and What Remains",
    ru: "Огонь, Империи и то, что осталось",
  },
  heroGhost: { en: "FERGANA", ru: "ФЕРГАНА" },
  heroIntro: {
    en: "Ten chapters. Two and a half thousand years. One village in the Fergana valley that outlasted every empire that passed through it.",
    ru: "Десять глав. Две с половиной тысячи лет. Одно село в Ферганской долине, пережившее все прошедшие через него империи.",
  },
  scrollHint: { en: "Scroll to begin", ru: "Прокрутите, чтобы начать" },
  audioOff: { en: "Audio: Off", ru: "Звук: Выкл" },
  audioOn: { en: "Audio: On", ru: "Звук: Вкл" },
  play: { en: "Play through", ru: "Воспроизвести" },
  playing: { en: "Playing…", ru: "Идёт показ…" },
  score: { en: "score", ru: "партитура" },
  marqueeItems: {
    en: ["Sogdiana", "Alexander the Great", "The Arab Conquest", "Samanid Dawn", "Genghis Khan", "The Khanates", "Empires & Borders", "Andarak"],
    ru: ["Согдиана", "Александр Македонский", "Арабское завоевание", "Эпоха Саманидов", "Чингисхан", "Ханства", "Империи и границы", "Андарак"],
  },
  artPending: {
    en: "Artwork in preparation — the archive is being restored",
    ru: "Иллюстрация готовится — архив восстанавливается",
  },
  galleryEyebrow: { en: "From the author's archive", ru: "Из архива автора" },
  galleryTitle: { en: "The Village, <em>Now</em>", ru: "Село, <em>Сейчас</em>" },
  galleryIntro: {
    en: "Not a painting, not a reconstruction — Andarak as it is. Snow on the mosque dome, poplars over the main street, the valley green in summer.",
    ru: "Не картина и не реконструкция — Андарак такой, какой он есть. Снег на куполе мечети, тополя над главной улицей, зелёная долина летом.",
  },
};

export const GALLERY = [
  {
    src: "/gallery/valley-green.png", span: "g-wide",
    caption: {
      en: "Andarak from above — poplars, orchards and clay roofs filling the valley floor",
      ru: "Андарак с высоты — тополя, сады и глиняные крыши на дне долины",
    },
  },
  {
    src: "/gallery/mosque-winter.png", span: "g-tall",
    caption: {
      en: "The golden dome of the village mosque under first snow",
      ru: "Золотой купол сельской мечети под первым снегом",
    },
  },
  {
    src: "/gallery/memorial-arch.png", span: "",
    caption: {
      en: "The memorial arch above the village — Turkestan range on the horizon",
      ru: "Мемориальная арка над селом — Туркестанский хребет на горизонте",
    },
  },
  {
    src: "/gallery/village-street.webp", span: "g-wide",
    caption: {
      en: "A market lane in early spring — walnut trees, Zhigulis, everyday life",
      ru: "Базарная улочка ранней весной — орешины, «Жигули», повседневная жизнь",
    },
  },
  {
    src: "/gallery/winter-street.png", span: "",
    caption: {
      en: "The main street in winter, poplars standing like sentries",
      ru: "Главная улица зимой, тополя стоят как часовые",
    },
  },
];

export const YT_TRACKS = {
  sogdiana: "DjJ9mOuACoc",
  invasion: "tBV5QhJV8Gk",
  alexandria: "SIVbDe7CpnE",
  death: "FfemUP21T0U",
  conquest: "QulvRHVs8ks",
  samanid: "Ov5ljc44Ajs",
  mongol: "58JoSx396a4",
  steppe: "VAHHaafpHcw",
  empires: "4tjyxHqDNtc",
  today: "vtjhaNtHzMo",
};

```

---

## `frontend/src/components/Hero.jsx`

```jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { UI } from "@/data/chapters";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ lang, sectionRef }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ghostX = useTransform(mx, (v) => v * 40);
  const ghostY = useTransform(my, (v) => v * 24);
  const glowX = useTransform(mx, (v) => v * -60);
  const glowY = useTransform(my, (v) => v * -40);

  return (
    <section
      ref={sectionRef}
      data-chapter="0"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: glowX, y: glowY,
          background: "radial-gradient(ellipse at 50% 42%, rgba(228,87,46,.16), transparent 60%)",
        }}
      />
      <motion.div className="hero-ghost" style={{ x: ghostX, y: ghostY, translateX: "-50%", translateY: "-52%" }} aria-hidden="true">
        {UI.heroGhost[lang]}
      </motion.div>

      <motion.p
        className="font-mono-d text-xs tracking-[.24em] uppercase mb-6 relative z-10"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        data-testid="hero-kicker"
      >
        {UI.kicker[lang]}
      </motion.p>

      <h1 className="font-display relative z-10" data-testid="hero-title">
        <span className="mask-line">
          <motion.span
            style={{
              fontWeight: 600,
              fontSize: "clamp(3.4rem, 12vw, 10.5rem)",
              lineHeight: 1,
              letterSpacing: ".05em",
              color: "var(--parchment)",
            }}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          >
            {UI.heroName[lang]}
          </motion.span>
        </span>
        <span className="mask-line">
          <motion.span
            className="inline-block mt-4"
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(1.5rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              color: "var(--ember)",
            }}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
            data-testid="hero-subtitle"
          >
            {UI.heroSub[lang]}
          </motion.span>
        </span>
      </h1>

      <motion.p
        className="relative z-10 mt-9 max-w-[52ch] text-sm md:text-base font-light"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.05, ease: EASE }}
        data-testid="hero-intro"
      >
        {UI.heroIntro[lang]}
      </motion.p>

      <motion.div
        className="scroll-hint absolute bottom-10 font-mono-d text-[10px] tracking-[.16em] uppercase z-10"
        style={{ color: "var(--parchment-dim)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        data-testid="hero-scroll-hint"
      >
        {UI.scrollHint[lang]} ↓
      </motion.div>
    </section>
  );
}

```

---

## `frontend/src/components/Marquee.jsx`

```jsx
import { UI } from "@/data/chapters";

export default function Marquee({ lang }) {
  const row = [...UI.marqueeItems[lang], ...UI.marqueeItems[lang], ...UI.marqueeItems[lang]];
  return (
    <div
      className="relative overflow-hidden py-14"
      style={{
        borderTop: "1px solid rgba(201,162,39,.4)",
        borderBottom: "1px solid rgba(201,162,39,.4)",
        background: "rgba(11,10,8,.55)",
      }}
      data-testid="era-marquee"
      aria-hidden="true"
    >
      <div className="marquee-track" style={{ animationDuration: "48s" }}>
        {[0, 1].map((n) => (
          <span key={n} className="flex items-center whitespace-nowrap">
            {row.map((item, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.8rem, 3.6vw, 3.2rem)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: ".02em",
                    color: "rgba(237,227,208,.6)",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    width: 7, height: 7, flexShrink: 0,
                    background: "var(--ember)",
                    transform: "rotate(45deg)",
                    margin: "0 36px",
                  }}
                />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

```

---

## `frontend/src/components/Chapter.jsx`

```jsx
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

```

---

## `frontend/src/components/Gallery.jsx`

```jsx
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

```

---

## `frontend/src/components/Chrome.jsx`

```jsx
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { CHAPTERS, FLAME_STATES, UI } from "@/data/chapters";

function Farvahar({ lit }) {
  return (
    <svg
      width="36" height="26" viewBox="0 0 44 28"
      data-testid="symbol-farvahar" role="img" aria-label="Farvahar — symbol of ancient Sogdiana"
      style={{ opacity: lit ? 1 : 0.2, transition: "opacity 1.2s ease" }}
    >
      <g fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="22" cy="10" r="3.4" />
        <path d="M18.4 8.6 L3 4.2" />
        <path d="M18.4 10.4 L4.5 9" />
        <path d="M18.4 12.2 L6 13.8" />
        <path d="M25.6 8.6 L41 4.2" />
        <path d="M25.6 10.4 L39.5 9" />
        <path d="M25.6 12.2 L38 13.8" />
        <path d="M20.3 13 L17.5 24.5" />
        <path d="M23.7 13 L26.5 24.5" />
      </g>
    </svg>
  );
}

function Crescent({ lit }) {
  return (
    <svg
      width="20" height="24" viewBox="0 0 20 24"
      data-testid="symbol-crescent" role="img" aria-label="Crescent — symbol of the Islamic era"
      style={{ opacity: lit ? 1 : 0.2, transition: "opacity 1.2s ease" }}
    >
      <path d="M14.6 1.6 A10.6 10.6 0 1 0 14.6 22.4 A8.5 8.5 0 1 1 14.6 1.6 Z" fill="#EDE3D0" />
    </svg>
  );
}

export default function Chrome({ active, lang, audioOn, playing, onLang, onAudio, onPlay, onDot }) {
  const chapter = active >= 1 ? CHAPTERS[active - 1] : null;
  const flame = FLAME_STATES[chapter ? chapter.flame : "alive"];
  const farvaharLit = active >= 1 && active <= 4;
  const crescentLit = active >= 5;

  return (
    <>
      <div className="fixed top-6 left-6 z-[100]" style={{ mixBlendMode: "screen" }}>
        <div className="flex items-center gap-4">
          <svg
            width="26" height="34" viewBox="0 0 26 34"
            className={flame.cls}
            data-testid="flame-indicator"
            style={{ transition: "filter 1.2s ease" }}
          >
            <ellipse cx="13" cy="20" rx="12" ry="14" fill={flame.color} opacity="0.3" style={{ transition: "fill 1.2s ease" }} />
            <path
              d="M13 0 C13 9 20 12 20 20 C20 27 17 34 13 34 C9 34 6 27 6 20 C6 15 9 13 10 9 C7 14 8 18 10 20 C9 15 12 12 13 0 Z"
              fill={flame.color}
              style={{ transition: "fill 1.2s ease" }}
            />
          </svg>
          <Farvahar lit={farvaharLit} />
          <Crescent lit={crescentLit} />
        </div>
        <span
          className="font-mono-d text-[10px] tracking-[.14em] uppercase block mt-1.5"
          style={{ color: "var(--parchment-dim)" }}
          data-testid="flame-label"
        >
          {flame.label[lang]}
        </span>
      </div>

      <div className="fixed top-6 right-6 z-[100] flex gap-3 items-center">
        <button className="ctrl-btn" onClick={onLang} data-testid="lang-toggle-btn">
          {lang === "en" ? "RU" : "EN"}
        </button>
        <button className="ctrl-btn" onClick={onAudio} data-testid="audio-toggle-btn">
          {audioOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
          {audioOn ? UI.audioOn[lang] : UI.audioOff[lang]}
        </button>
        <button className="ctrl-btn" onClick={onPlay} data-testid="play-through-btn">
          {playing ? <Pause size={13} /> : <Play size={13} />}
          {playing ? UI.playing[lang] : UI.play[lang]}
        </button>
      </div>

      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-3.5" data-testid="chapter-nav">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            className="group relative w-2 h-2 rounded-full cursor-pointer transition-transform duration-300"
            style={{
              background: active === i + 1 ? "var(--parchment)" : "rgba(237,227,208,.25)",
              transform: active === i + 1 ? "scale(1.35)" : "scale(1)",
            }}
            onClick={() => onDot(i + 1)}
            data-testid={`chapter-dot-${c.num}`}
          >
            <span
              className="absolute right-5 top-1/2 -translate-y-1/2 font-mono-d text-[10px] tracking-[.08em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ color: "var(--parchment-dim)" }}
            >
              {c.num} — {c.eyebrow[lang]}
            </span>
          </div>
        ))}
      </nav>

      <AnimatePresence>
        {chapter && (
          <motion.div
            key={chapter.id + lang}
            className="fixed bottom-7 left-6 z-[100] max-w-[300px] font-mono-d text-[11px]"
            style={{ lineHeight: 1.6, color: "var(--parchment-dim)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6 }}
            data-testid="score-cue"
          >
            <span className="uppercase tracking-[.12em] text-[10px]" style={{ color: "var(--ember)" }}>
              {UI.score[lang]}
            </span>
            <br />
            {chapter.cue[lang]}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

```

---

## `frontend/src/hooks/useAmbience.js`

```jsx
import { useEffect, useRef } from "react";

const MASTER = 0.32;

const PRESETS = {
  fire:  { noise: "pink",  freq: 900,  q: 0.6, lfoRate: 5.0,  lfoDepth: 0.35, base: 0.5,  crackle: true },
  storm: { noise: "brown", freq: 200,  q: 0.5, lfoRate: 0.12, lfoDepth: 0.5,  base: 0.85 },
  wind:  { noise: "pink",  freq: 450,  q: 1.4, lfoRate: 0.07, lfoDepth: 0.65, base: 0.45 },
  calm:  { noise: "pink",  freq: 1400, q: 0.4, lfoRate: 0.05, lfoDepth: 0.2,  base: 0.16 },
  birds: { noise: "pink",  freq: 2400, q: 0.5, lfoRate: 0.1,  lfoDepth: 0.2,  base: 0.12, chirp: true },
};

function makeNoiseBuffer(ctx, type) {
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (type === "brown") {
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    } else {
      d[i] = w * 0.6;
    }
  }
  return buf;
}

function destroyVoice(v, fade, ctx) {
  if (!v) return;
  const t = ctx.currentTime;
  try {
    if (v.interval) clearInterval(v.interval);
    v.g.gain.cancelScheduledValues(t);
    v.g.gain.setValueAtTime(Math.max(v.g.gain.value, 0.0001), t);
    v.g.gain.exponentialRampToValueAtTime(0.0001, t + fade);
    setTimeout(() => {
      try { v.src.stop(); v.lfo.stop(); v.g.disconnect(); } catch (e) { /* already stopped */ }
    }, fade * 1000 + 120);
  } catch (e) { /* context closed */ }
}

function createVoice(ctx, master, preset, buffers) {
  const src = ctx.createBufferSource();
  src.buffer = buffers[preset.noise];
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = preset.freq;
  filter.Q.value = preset.q;
  const g = ctx.createGain();
  g.gain.value = 0;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = preset.lfoRate;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = preset.base * MASTER * preset.lfoDepth;
  lfo.connect(lfoGain);
  lfoGain.connect(g.gain);
  src.connect(filter);
  filter.connect(g);
  g.connect(master);
  src.start();
  lfo.start();
  const now = ctx.currentTime;
  g.gain.linearRampToValueAtTime(preset.base * MASTER, now + 1.6);

  let interval = null;
  if (preset.crackle) {
    interval = setInterval(() => {
      if (Math.random() > 0.55 || ctx.state !== "running") return;
      const t = ctx.currentTime;
      const b = ctx.createBufferSource();
      b.buffer = buffers.pink;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1500 + Math.random() * 2500;
      bp.Q.value = 8;
      const cg = ctx.createGain();
      cg.gain.setValueAtTime(0.0001, t);
      cg.gain.exponentialRampToValueAtTime(0.1 + Math.random() * 0.16, t + 0.006);
      cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.08 + Math.random() * 0.12);
      b.connect(bp); bp.connect(cg); cg.connect(master);
      b.start(t, Math.random() * 1.5);
      b.stop(t + 0.3);
    }, 220);
  }
  if (preset.chirp) {
    interval = setInterval(() => {
      if (Math.random() > 0.45 || ctx.state !== "running") return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = "sine";
      const f0 = 2200 + Math.random() * 1800;
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(f0 * (0.6 + Math.random() * 0.9), t + 0.09);
      const og = ctx.createGain();
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.04 + Math.random() * 0.05, t + 0.02);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(og); og.connect(master);
      o.start(t);
      o.stop(t + 0.2);
    }, 700);
  }
  return { src, lfo, g, interval };
}

export function useAmbience(on, preset) {
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const buffersRef = useRef(null);
  const voiceRef = useRef(null);

  useEffect(() => {
    if (!on) return undefined;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return undefined;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    buffersRef.current = {
      pink: makeNoiseBuffer(ctx, "pink"),
      brown: makeNoiseBuffer(ctx, "brown"),
    };
    ctxRef.current = ctx;
    masterRef.current = master;
    if (ctx.state === "suspended") ctx.resume();
    return () => {
      destroyVoice(voiceRef.current, 0.1, ctx);
      voiceRef.current = null;
      ctx.close().catch(() => {});
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, [on]);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!on || !ctx || !preset || !PRESETS[preset]) return;
    destroyVoice(voiceRef.current, 1.4, ctx);
    voiceRef.current = createVoice(ctx, masterRef.current, PRESETS[preset], buffersRef.current);
  }, [preset, on]);
}

```

---

## `frontend/src/hooks/useTrack.js`

```jsx
import { useEffect, useRef } from "react";

const TARGET = 0.55;

function fade(audio, to, ms, done) {
  const from = audio.volume;
  const start = performance.now();
  const step = (t) => {
    const k = Math.min((t - start) / ms, 1);
    try { audio.volume = from + (to - from) * k; } catch (e) { /* element released */ }
    if (k < 1) requestAnimationFrame(step);
    else if (done) done();
  };
  requestAnimationFrame(step);
}

export function useTrack(on, url) {
  const curRef = useRef(null);

  useEffect(() => {
    const prev = curRef.current;
    if (prev) {
      fade(prev, 0, 1200, () => {
        prev.pause();
        prev.removeAttribute("src");
      });
      curRef.current = null;
    }
    if (!on || !url) return undefined;
    const el = new Audio(url);
    el.loop = true;
    el.volume = 0;
    el.play().then(() => fade(el, TARGET, 1600)).catch(() => {});
    curRef.current = el;
    return undefined;
  }, [on, url]);

  useEffect(
    () => () => {
      if (curRef.current) {
        curRef.current.pause();
        curRef.current.removeAttribute("src");
        curRef.current = null;
      }
    },
    []
  );
}

```

---

## `frontend/src/hooks/useYouTubeScore.js`

```jsx
import { useEffect, useRef, useState } from "react";

const MAX_VOL = 55;

function fadeVolume(player, from, to, ms, done) {
  const start = performance.now();
  const step = (t) => {
    const k = Math.min((t - start) / ms, 1);
    try {
      player.setVolume(Math.round(from + (to - from) * k));
    } catch (e) { /* player not ready */ }
    if (k < 1) requestAnimationFrame(step);
    else if (done) done();
  };
  requestAnimationFrame(step);
}

export function useYouTubeScore(on, videoId, onError) {
  const errorRef = useRef(onError);
  errorRef.current = onError;
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef(null);
  const currentRef = useRef(null);
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    if (!on) return;
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      setApiReady(true);
    };
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, [on]);

  useEffect(() => {
    if (!apiReady || playerRef.current) return;
    let el = document.getElementById("yt-score-player");
    if (!el) {
      el = document.createElement("div");
      el.id = "yt-score-player";
      el.setAttribute("data-testid", "yt-score-player");
      el.style.cssText = "position:fixed;left:-20px;top:-20px;width:2px;height:2px;opacity:0;pointer-events:none;";
      document.body.appendChild(el);
    }
    playerRef.current = new window.YT.Player(el, {
      width: 2,
      height: 2,
      playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0, autoplay: 1, mute: 1 },
      events: {
        onReady: () => setPlayerReady(true),
        onError: (e) => {
          window.__ytErr = e.data;
          if (currentRef.current && errorRef.current) errorRef.current(currentRef.current, e.data);
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.ENDED) {
            try { e.target.playVideo(); } catch (err) { /* released */ }
          }
          if (e.data === window.YT.PlayerState.PLAYING && shouldPlayRef.current) {
            try {
              if (e.target.isMuted && e.target.isMuted()) e.target.unMute();
            } catch (err) { /* released */ }
          }
          if ((e.data === window.YT.PlayerState.UNSTARTED || e.data === window.YT.PlayerState.CUED) && shouldPlayRef.current) {
            try { e.target.playVideo(); } catch (err) { /* released */ }
          }
        },
      },
    });
    window.__ytScore = playerRef.current;
  }, [apiReady]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    if (!on || !videoId) {
      shouldPlayRef.current = false;
      if (currentRef.current) {
        fadeVolume(player, MAX_VOL, 0, 900, () => {
          try { player.pauseVideo(); } catch (e) { /* released */ }
        });
        currentRef.current = null;
      }
      return;
    }
    if (currentRef.current === videoId) return;
    currentRef.current = videoId;
    shouldPlayRef.current = true;
    fadeVolume(player, MAX_VOL, 0, 900, () => {
      try {
        if (player.mute) player.mute();
        player.loadVideoById(videoId);
        player.playVideo();
        player.setVolume(0);
        fadeVolume(player, 0, MAX_VOL, 1500);
      } catch (e) { /* released */ }
    });
  }, [on, videoId, playerReady]);
}

```

---

## `frontend/tailwind.config.js`

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

---

## `frontend/package.json`

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@hookform/resolvers": "5.0.1",
    "@radix-ui/react-accordion": "1.2.8",
    "@radix-ui/react-alert-dialog": "1.1.11",
    "@radix-ui/react-aspect-ratio": "1.1.4",
    "@radix-ui/react-avatar": "1.1.7",
    "@radix-ui/react-checkbox": "1.2.3",
    "@radix-ui/react-collapsible": "1.1.8",
    "@radix-ui/react-context-menu": "2.2.12",
    "@radix-ui/react-dialog": "1.1.11",
    "@radix-ui/react-dropdown-menu": "2.1.12",
    "@radix-ui/react-hover-card": "1.1.11",
    "@radix-ui/react-label": "2.1.4",
    "@radix-ui/react-menubar": "1.1.12",
    "@radix-ui/react-navigation-menu": "1.2.10",
    "@radix-ui/react-popover": "1.1.11",
    "@radix-ui/react-progress": "1.1.4",
    "@radix-ui/react-radio-group": "1.3.4",
    "@radix-ui/react-scroll-area": "1.2.6",
    "@radix-ui/react-select": "2.2.2",
    "@radix-ui/react-separator": "1.1.4",
    "@radix-ui/react-slider": "1.3.2",
    "@radix-ui/react-slot": "1.2.0",
    "@radix-ui/react-switch": "1.2.2",
    "@radix-ui/react-tabs": "1.1.9",
    "@radix-ui/react-toast": "1.2.11",
    "@radix-ui/react-toggle": "1.1.6",
    "@radix-ui/react-toggle-group": "1.1.7",
    "@radix-ui/react-tooltip": "1.2.4",
    "@tanstack/react-query": "5.56.2",
    "axios": "1.18.0",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.1.1",
    "cra-template": "1.2.0",
    "date-fns": "4.1.0",
    "dayjs": "1.11.13",
    "embla-carousel-react": "8.6.0",
    "framer-motion": "11.18.0",
    "input-otp": "1.4.2",
    "lenis": "^1.3.26",
    "lodash": "4.18.1",
    "lucide-react": "0.516.0",
    "next-themes": "0.4.6",
    "react": "19.0.0",
    "react-day-picker": "8.10.1",
    "react-dom": "19.0.0",
    "react-hook-form": "7.56.2",
    "react-resizable-panels": "3.0.1",
    "react-router-dom": "7.15.0",
    "react-scripts": "5.0.1",
    "recharts": "3.6.0",
    "sonner": "2.0.3",
    "swr": "2.3.8",
    "tailwind-merge": "3.2.0",
    "tailwindcss-animate": "1.0.7",
    "vaul": "1.1.2",
    "zod": "3.24.4"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "7.21.11",
    "@craco/craco": "7.1.0",
    "@emergentbase/visual-edits": "https://assets.emergent.sh/npm/emergentbase-visual-edits-1.0.13.tgz",
    "@eslint/js": "9.23.0",
    "@types/lodash": "4.17.24",
    "autoprefixer": "10.4.20",
    "dotenv": "16.4.5",
    "eslint": "9.23.0",
    "eslint-plugin-import": "2.31.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-react": "7.37.4",
    "eslint-plugin-react-hooks": "5.2.0",
    "globals": "15.15.0",
    "postcss": "8.5.10",
    "tailwindcss": "3.4.17"
  },
  "resolutions": {
    "react-router": "7.15.1",
    "node-forge": "1.4.0",
    "fast-uri": "3.1.2",
    "flatted": "3.4.2",
    "qs": "6.15.2",
    "diff": "4.0.4",
    "follow-redirects": "1.16.0",
    "path-to-regexp": "0.1.13",
    "rollup": "2.80.0",
    "underscore": "1.13.8",
    "@babel/plugin-transform-modules-systemjs": "7.29.4",
    "@eslint/plugin-kit": "0.3.4",
    "shell-quote": "1.9.0",
    "jsonpath": "1.3.0",
    "nth-check": "2.0.1",
    "serialize-javascript": "7.0.5",
    "uuid": "11.1.1",
    "@tootallnate/once": "2.0.1",
    "webpack-dev-server": "5.2.6",
    "resolve-url-loader": "5.0.0",
    "**/resolve-url-loader/postcss": "8.5.10",
    "**/axios/form-data": "4.0.6",
    "**/jsdom/form-data": "3.0.5",
    "**/postcss-svgo/svgo": "2.8.1",
    "**/webpack-dev-server/ws": "8.21.0",
    "**/postcss-load-config/yaml": "2.8.3",
    "**/cosmiconfig/yaml": "1.10.3",
    "**/cssnano/yaml": "1.10.3",
    "**/eslint/js-yaml": "4.3.0",
    "**/@eslint/eslintrc/js-yaml": "4.3.0",
    "**/svgo/js-yaml": "3.15.0",
    "**/@istanbuljs/load-nyc-config/js-yaml": "3.15.0",
    "**/css-loader/postcss": "8.5.10",
    "**/css-minimizer-webpack-plugin/postcss": "8.5.10",
    "**/react-scripts/postcss": "8.5.10",
    "**/filelist/minimatch": "5.1.8",
    "**/anymatch/picomatch": "2.3.2",
    "**/micromatch/picomatch": "2.3.2",
    "**/readdirp/picomatch": "2.3.2",
    "**/jest-util/picomatch": "2.3.2",
    "**/tinyglobby/picomatch": "4.0.4",
    "http-proxy-middleware": "2.0.10"
  },
  "packageManager": "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"
}

```
