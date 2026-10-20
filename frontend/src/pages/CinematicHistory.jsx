import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Info, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useYouTubeScore } from '@/hooks/useYouTubeScore';
import { useTrack } from '@/hooks/useTrack';
import { useAmbience } from '@/hooks/useAmbience';
import { CHAPTERS, YT_TRACKS } from '@/data/chapters';
import { JOURNEY } from '@/data/journey';
import '@/journey.css';
import '@/journey-opening.css';

const FIRST = -1;
const LAST = JOURNEY.length - 1;

const OPEN_EASE = [.76, 0, .24, 1];
const frameMotion = {
  enter: ({ direction, reduced }) => ({
    clipPath: reduced ? 'inset(0% 0% 0% 0% round 0px)' : `inset(${direction > 0 ? '75% 38% 5% 38%' : '5% 38% 75% 38%'} round 80px)`,
    y: reduced ? 0 : direction * 70,
    scale: reduced ? 1 : .94,
    zIndex: 2,
  }),
  open: { clipPath: 'inset(0% 0% 0% 0% round 0px)', y: 0, scale: 1, zIndex: 2 },
  leave: ({ direction, reduced }) => ({ y: reduced ? 0 : direction * -90, scale: reduced ? 1 : .9, opacity: reduced ? 0 : .45, zIndex: 1 }),
};

function OpeningTitle({ lines, reduced }) {
  return lines.map((line, row) => <span className="j-title-line" key={line} aria-hidden="true">{line.split(' ').map((word, i) => <span className="j-word-mask" key={`${word}-${i}`}><motion.span initial={reduced ? false : { y: '115%', rotateX: -65 }} animate={{ y: 0, rotateX: 0 }} transition={{ delay: reduced ? 0 : .48 + row * .12 + i * .055, duration: .85, ease: [.16, 1, .3, 1] }}>{word}&nbsp;</motion.span></span>)}</span>);
}

function Scene({ scene, index, lang, direction, reduced, onDetails }) {
  const title = scene.title[lang].join(' ');
  return (
    <motion.section
      className="j-frame j-scene"
      aria-labelledby={`heading-${index}`}
      custom={{ direction, reduced }} variants={frameMotion} initial="enter" animate="open" exit="leave"
      transition={{ duration: reduced ? .01 : 1.15, ease: OPEN_EASE }}
    >
      <motion.img className="j-backdrop" src={scene.art} alt="" loading="lazy" initial={{ scale: 1.15 }} animate={{ scale: 1.04 }} transition={{ duration: 7, ease: 'linear' }}/>
      <div className="j-atmosphere" aria-hidden="true"/>
      <motion.div className="j-picture-wrap" initial={reduced ? false : { scale: 1.25, y: direction * 80 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 1.65, ease: [.16, 1, .3, 1] }}>
        <motion.img className="j-art" src={scene.art} alt={title} draggable="false" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.7, ease: [.16, 1, .3, 1] }}/>
        <div className="j-picture-glass"/>
      </motion.div>
      <div className="j-scene-shade"/>
      <motion.div className="j-copy" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .35, duration: .7 }}>
        <p className="j-kicker"><span>{String(index + 1).padStart(2, '0')}</span>{scene.date[lang]}</p>
        <h2 id={`heading-${index}`} tabIndex={-1} aria-label={title}><OpeningTitle lines={scene.title[lang]} reduced={reduced}/></h2>
        <p className="j-description">{scene.body[lang]}</p>
        <button className="j-details-open" onClick={onDetails}><Info size={15}/>{lang === 'en' ? 'Historical context' : 'Исторический контекст'}</button>
      </motion.div>
      <div className="j-frame-meta"><span>ANDARAK / {lang === 'en' ? 'A LIVING HISTORY' : 'ЖИВАЯ ИСТОРИЯ'}</span><span>{index === 9 ? (lang === 'en' ? 'AUTHOR’S ARCHIVE' : 'АРХИВ АВТОРА') : (lang === 'en' ? 'ARTISTIC RECONSTRUCTION' : 'ХУДОЖЕСТВЕННАЯ РЕКОНСТРУКЦИЯ')}</span></div>
      <span className="j-ghost-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    </motion.section>
  );
}

function Hero({ lang, direction, reduced, onStart, onSilent }) {
  return (
    <motion.section className="j-frame j-hero" custom={{ direction, reduced }} variants={frameMotion} initial="enter" animate="open" exit="leave" transition={{ duration: reduced ? .01 : 1.15, ease: OPEN_EASE }}>
      <motion.img className="j-hero-image" src="/art/journey-1.jpg" alt="" fetchPriority="high" initial={{ scale: 1.12 }} animate={{ scale: 1.02 }} transition={{ duration: 8, ease: 'linear' }}/>
      <div className="j-hero-shade"/>
      <div className="j-hero-lines" aria-hidden="true"><i/><i/><i/></div>
      <motion.div className="j-hero-copy" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .85 }}>
        <p className="j-kicker"><span>2026</span>{lang === 'en' ? 'An immersive history of Andarak' : 'Иммерсивная история Андарака'}</p>
        <h1 aria-label={lang === 'en' ? 'Empires pass. We remain.' : 'Империи уходят. Мы остаёмся.'}><OpeningTitle lines={lang === 'en' ? ['Empires pass.', 'We remain.'] : ['Империи уходят.', 'Мы остаёмся.']} reduced={reduced}/></h1>
        <p>{lang === 'en' ? 'Ten eras. One homeland. Enter a cinematic journey through fire, resistance, knowledge, loss, and memory.' : 'Десять эпох. Одна родина. Путешествие через огонь, сопротивление, знание, утрату и память.'}</p>
        <div className="j-start-options">
          <button className="j-primary" onClick={onStart}>{lang === 'en' ? 'Begin with music' : 'Начать с музыкой'}<Volume2 size={18}/></button>
          <button className="j-secondary" onClick={onSilent}>{lang === 'en' ? 'Enter silently' : 'Начать без звука'}<ChevronRight size={18}/></button>
        </div>
      </motion.div>
      <div className="j-frame-meta"><span>{lang === 'en' ? 'USE ← → KEYS OR SWIPE' : 'КЛАВИШИ ← → ИЛИ СВАЙП'}</span><span>00 / 10</span></div>
    </motion.section>
  );
}

export default function CinematicHistory({ initialLang = 'en', onLang }) {
  const lang = initialLang === 'ru' ? 'ru' : 'en';
  const [active, setActive] = useState(FIRST);
  const [direction, setDirection] = useState(1);
  const [menu, setMenu] = useState(false);
  const [details, setDetails] = useState(false);
  const [audio, setAudio] = useState(false);
  const [failedTracks, setFailedTracks] = useState({});
  const reduced = useReducedMotion();
  const activeRef = useRef(active);
  const wheelLock = useRef(false);
  const touchStart = useRef(null);
  const transitionUntil = useRef(0);
  activeRef.current = active;

  const failAudio = useCallback((id) => {
    if (id) setFailedTracks(previous => previous[id] ? previous : { ...previous, [id]: true });
  }, []);
  const originalChapter = active >= 0 ? CHAPTERS[active] : null;
  const originalVideoId = originalChapter ? YT_TRACKS[originalChapter.id] : null;
  const videoId = originalVideoId && !failedTracks[originalVideoId] ? originalVideoId : null;
  const trackUrl = !videoId && originalChapter?.audio && !failedTracks[originalChapter.audio] ? originalChapter.audio : null;
  const musicStatus = useYouTubeScore(audio && !!videoId, videoId, failAudio);
  useTrack(audio, trackUrl, failAudio);
  useAmbience(audio && active >= 0 && !videoId && !trackUrl, originalChapter?.sound || 'calm');

  const go = useCallback((next) => {
    if (Date.now() < transitionUntil.current) return;
    const target = Math.max(FIRST, Math.min(LAST, next));
    if (target === activeRef.current) return;
    transitionUntil.current = Date.now() + (reduced ? 20 : 1250);
    setDirection(target > activeRef.current ? 1 : -1);
    setDetails(false);
    setMenu(false);
    setActive(target);
  }, [reduced]);
  const step = useCallback(delta => go(activeRef.current + delta), [go]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = event => {
      if (menu || details) {
        if (event.key === 'Escape') { setMenu(false); setDetails(false); }
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); step(1); }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); step(-1); }
      if (event.key === 'Home') go(FIRST);
      if (event.key === 'End') go(LAST);
    };
    const wheel = event => {
      if (menu || details || Math.abs(event.deltaY) + Math.abs(event.deltaX) < 22 || wheelLock.current) return;
      wheelLock.current = true;
      step((event.deltaY || event.deltaX) > 0 ? 1 : -1);
      window.setTimeout(() => { wheelLock.current = false; }, reduced ? 150 : 950);
    };
    window.addEventListener('keydown', key);
    window.addEventListener('wheel', wheel, { passive: true });
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key); window.removeEventListener('wheel', wheel); };
  }, [details, go, menu, reduced, step]);

  const current = active >= 0 ? JOURNEY[active] : null;
  const progress = ((active + 1) / JOURNEY.length) * 100;
  return (
    <main className="journey j-deck" lang={lang} onTouchStart={e => { touchStart.current = e.touches[0]?.clientX; }} onTouchEnd={e => { const end = e.changedTouches[0]?.clientX; if (touchStart.current != null && end != null && Math.abs(end - touchStart.current) > 55) step(end < touchStart.current ? 1 : -1); touchStart.current = null; }}>
      <header className="j-header">
        <Link to="/" className="j-wordmark">ANDARAK<span>{lang === 'en' ? 'THE LIVING ARCHIVE' : 'ЖИВОЙ АРХИВ'}</span></Link>
        <div className="j-controls">
          <button onClick={onLang} aria-label={lang === 'en' ? 'Switch to Russian' : 'Переключить на английский'}>{lang.toUpperCase()}<span>/ {lang === 'en' ? 'RU' : 'EN'}</span></button>
          <button className="j-music-toggle" data-testid="audio-toggle" data-soundtrack-id={videoId || trackUrl || 'ambience'} data-playback-status={musicStatus} aria-label={audio ? 'Turn music off' : 'Turn music on'} aria-pressed={audio} onClick={() => setAudio(value => !value)}>{audio ? <Volume2 size={17}/> : <VolumeX size={17}/>}<span>{lang === 'en' ? (audio ? (videoId && musicStatus !== 'playing' ? 'Loading…' : 'Music on') : 'Music off') : (audio ? 'Звук вкл' : 'Звук выкл')}</span></button>
          <button onClick={() => setMenu(true)} aria-label={lang === 'en' ? 'Chapters' : 'Главы'} aria-haspopup="dialog" aria-expanded={menu}><span>{lang === 'en' ? 'Chapters' : 'Главы'}</span><Menu size={19}/></button>
        </div>
      </header>

      <div className="j-progress"><motion.i animate={{ width: `${progress}%` }} transition={{ duration: .7 }}/></div>
      <div className="j-viewport" aria-live="polite">
        <AnimatePresence mode="sync" custom={{ direction, reduced }}>
          {active === FIRST
            ? <Hero key="hero" lang={lang} direction={direction} reduced={reduced} onStart={() => { setAudio(true); go(0); }} onSilent={() => { setAudio(false); go(0); }}/>
            : <Scene key={active} scene={JOURNEY[active]} index={active} lang={lang} direction={direction} reduced={reduced} onDetails={() => setDetails(true)}/>
          }
        </AnimatePresence>
      </div>

      <nav className="j-arrows" aria-label={lang === 'en' ? 'Presentation controls' : 'Управление презентацией'}>
        <button onClick={() => step(-1)} disabled={active === FIRST} aria-label={lang === 'en' ? 'Previous chapter' : 'Предыдущая глава'}><ChevronLeft/></button>
        <span>{active === FIRST ? '00' : String(active + 1).padStart(2, '0')} <i/> 10</span>
        <button onClick={() => step(1)} disabled={active === LAST} aria-label={lang === 'en' ? 'Next chapter' : 'Следующая глава'}><ChevronRight/></button>
      </nav>

      {active >= 0 && <nav className="j-dots" aria-label={lang === 'en' ? 'Chapter navigation' : 'Навигация по главам'}>{JOURNEY.map((scene, index) => <button key={index} aria-label={`${index + 1}. ${scene.title[lang].join(' ')}`} aria-current={active === index ? 'step' : undefined} onClick={() => go(index)}><i/></button>)}</nav>}

      <AnimatePresence>
        {details && current && <motion.aside className="j-details" role="dialog" aria-modal="true" aria-labelledby="j-details-title" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
          <button className="j-close" onClick={() => setDetails(false)} aria-label="Close"><X/></button>
          <p className="j-kicker"><span>{String(active + 1).padStart(2, '0')}</span>{current.date[lang]}</p>
          <h2 id="j-details-title">{lang === 'en' ? 'Behind the scene' : 'Об этой сцене'}</h2>
          <p>{current.note[lang]}</p>
          <small>{lang === 'en' ? 'The reconstructed scenes are artistic interpretations, not archival evidence.' : 'Реконструированные сцены — художественные интерпретации, а не архивные свидетельства.'}</small>
        </motion.aside>}
      </AnimatePresence>

      <AnimatePresence>
        {menu && <motion.div className="j-menu" role="dialog" aria-modal="true" aria-labelledby="j-menu-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="j-close" onClick={() => setMenu(false)} aria-label="Close"><X/></button>
          <p className="j-kicker"><span>INDEX</span>ANDARAK</p>
          <h2 id="j-menu-title">{lang === 'en' ? 'Choose an era.' : 'Выберите эпоху.'}</h2>
          <div className="j-menu-grid">{JOURNEY.map((scene, index) => <button onClick={() => go(index)} key={index}><img src={scene.art} alt=""/><span><small>{String(index + 1).padStart(2, '0')} / {scene.date[lang]}</small>{scene.title[lang].join(' ')}</span><ArrowUpRight size={17}/></button>)}</div>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
