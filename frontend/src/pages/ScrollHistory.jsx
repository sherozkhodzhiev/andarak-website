import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Volume2, VolumeX, X, Grid2X2 } from 'lucide-react';
import { JOURNEY } from '@/data/journey';
import { CHAPTERS, YT_TRACKS } from '@/data/chapters';
import { useYouTubeScore } from '@/hooks/useYouTubeScore';
import { useTrack } from '@/hooks/useTrack';
import { useAmbience } from '@/hooks/useAmbience';
import '@/scroll-history.css';
import '@/travel-history.css';

function Chapter({ scene, index, lang, onActive, onDetails, reduced }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const imageScale = useTransform(p, [0, 1], [1, 1.34]);
  const imageY = useTransform(p, [0, 1], ['3%', '-3%']);
  const gateZ = useTransform(p, [0, .65, 1], [0, 720, 1100]);
  const gateOpacity = useTransform(p, [0, .56, .75], [1, 1, 0]);
  const titleY = useTransform(p, [0, .18, .7, 1], [35, 0, 0, -35]);
  const opacity = useTransform(p, [0, .12, .65, .9], [1, 1, 1, 0]);
  const nextOpacity = useTransform(p, [.72, 1], [0, 1]);
  const nextScale = useTransform(p, [.72, 1], [.92, 1]);
  useMotionValueEvent(p, 'change', value => { if (value > 0 && value < 1) onActive(index); });
  return <section ref={ref} id={`era-${index}`} className={`sh-chapter sh-tone-${index % 3}`} aria-labelledby={`era-title-${index}`}>
    <div className="sh-stage">
      <motion.div className="sh-scene-image" style={reduced ? {} : { scale: imageScale, y: imageY }}>
        <img src={scene.art} alt={scene.title[lang].join(' ')} loading={index < 2 ? 'eager' : 'lazy'}/>
        <div className="sh-shade"/>
      </motion.div>
      <div className="travel-perspective" aria-hidden="true"><motion.div className="travel-gate" style={reduced ? {display:'none'} : {z:gateZ,opacity:gateOpacity}}><i className="travel-pillar left"/><i className="travel-pillar right"/><i className="travel-lintel"/></motion.div></div>
      {!reduced && index < JOURNEY.length-1 && <motion.div className="travel-next" aria-hidden="true" style={{opacity:nextOpacity,scale:nextScale}}><img src={JOURNEY[index+1].art} alt=""/><div className="sh-shade"/></motion.div>}
      <motion.div className="sh-story" style={reduced ? {} : { y: titleY, opacity }}>
        <p className="sh-label"><b>{String(index + 1).padStart(2, '0')}</b><span>{scene.date[lang]}</span></p>
        <h2 id={`era-title-${index}`}>{scene.title[lang][0]}<br/><em>{scene.title[lang][1]}</em></h2>
        <div className="sh-story-bottom"><p>{scene.body[lang]}</p><button onClick={() => onDetails(index)}>{lang === 'en' ? 'Read the context' : 'Исторический контекст'}<ArrowUpRight size={18}/></button></div>
      </motion.div>
      <span className="sh-scene-note">{index === 7 ? (lang === 'en' ? 'ORIGIN STORY · ARTISTIC INTERPRETATION' : 'РАССКАЗ О ПРОИСХОЖДЕНИИ · ХУДОЖЕСТВЕННЫЙ ОБРАЗ') : index === 9 ? (lang === 'en' ? 'AUTHOR’S PHOTO ARCHIVE' : 'ФОТОАРХИВ АВТОРА') : (lang === 'en' ? 'ARTISTIC RECONSTRUCTION' : 'ХУДОЖЕСТВЕННАЯ РЕКОНСТРУКЦИЯ')}</span>
    </div>
  </section>;
}

export default function ScrollHistory({ initialLang = 'en', onLang }) {
  const lang = initialLang === 'ru' ? 'ru' : 'en';
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const [menu, setMenu] = useState(false);
  const [details, setDetails] = useState(null);
  const [audio, setAudio] = useState(false);
  const [failed, setFailed] = useState({});
  const closeRef = useRef(null);
  const returnFocus = useRef(null);
  const { scrollYProgress } = useScroll();
  const fail = useCallback(id => { if(id) setFailed(prev => prev[id] ? prev : {...prev,[id]:true}); }, []);
  const chapter = CHAPTERS[Math.max(active, 0)];
  const original = YT_TRACKS[chapter.id];
  const videoId = original && !failed[original] ? original : null;
  const track = !videoId && chapter.audio && !failed[chapter.audio] ? chapter.audio : null;
  const status = useYouTubeScore(audio && !!videoId, videoId, fail);
  useTrack(audio, track, fail);
  useAmbience(audio && !videoId && !track, chapter.sound || 'calm');
  const jump = useCallback(index => {
    setMenu(false);
    requestAnimationFrame(() => document.getElementById(index < 0 ? 'history-start' : `era-${index}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));
  }, [reduced]);
  useEffect(() => {
    const reset = () => { if(window.scrollY < window.innerHeight * .6) setActive(-1); };
    window.addEventListener('scroll',reset,{passive:true});
    return () => window.removeEventListener('scroll',reset);
  }, []);
  const overlay = menu || details !== null;
  useEffect(() => {
    if(!overlay) return;
    returnFocus.current = document.activeElement;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = e => {
      if(e.key === 'Escape') { setMenu(false); setDetails(null); }
      if(e.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll('.sh-dialog button, .sh-dialog a'));
        const first = buttons[0], last = buttons[buttons.length - 1];
        if(e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        if(!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown',key);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown',key); returnFocus.current?.focus(); };
  },[overlay]);
  return <main className="scroll-history travel-history" lang={lang}>
    <header className="sh-header"><Link to="/" className="sh-brand">ANDARAK<span>{lang === 'en' ? 'THE LIVING ARCHIVE' : 'ЖИВОЙ АРХИВ'}</span></Link><div>
      <button onClick={onLang} aria-label={lang === 'en' ? 'Switch language' : 'Сменить язык'}>{lang.toUpperCase()}</button>
      <button data-testid="audio-toggle" data-soundtrack-id={videoId || track || 'ambience'} data-playback-status={status} aria-pressed={audio} aria-label={audio ? 'Turn music off' : 'Turn music on'} onClick={() => setAudio(v=>!v)}>{audio ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button>
      <button className="sh-index-button" aria-label={lang === 'en' ? 'Chapters' : 'Главы'} aria-expanded={menu} aria-haspopup="dialog" onClick={() => setMenu(true)}><span>{lang === 'en' ? 'Chapters' : 'Главы'}</span><Grid2X2 size={17}/></button>
    </div></header>
    <motion.div className="sh-progress" style={{scaleX:scrollYProgress}}/>
    <section id="history-start" className="sh-intro">
      <div className="sh-intro-top"><span>01—10 / {lang === 'en' ? 'A JOURNEY THROUGH TIME' : 'ПУТЕШЕСТВИЕ ВО ВРЕМЕНИ'}</span><span>ANDARAK • CENTRAL ASIA</span></div>
      <img className="travel-opening" src={JOURNEY[0].art} alt=""/>
      <h1>{(lang === 'en' ? ['Step into','our history.'] : ['Войдите','в нашу историю.']).map((line,i)=><span key={line}><motion.span initial={reduced ? false : {y:'110%'}} animate={{y:0}} transition={{duration:1.1,delay:.1+i*.12,ease:[.16,1,.3,1]}}>{line}</motion.span></span>)}</h1>
      <div className="sh-intro-bottom"><p>{lang === 'en' ? 'Ten eras. One homeland. Follow the thread of fire, resistance, knowledge and memory.' : 'Десять эпох. Одна родина. Сквозь огонь, сопротивление, знание и память.'}</p><button onClick={()=>{setAudio(true);jump(0);}}><Volume2 size={17}/>{lang === 'en' ? 'Explore with music' : 'Начать с музыкой'}</button><button onClick={()=>jump(0)} className="sh-scroll-button">{lang === 'en' ? 'Scroll to discover' : 'Листайте вниз'}<ArrowDown size={20}/></button></div>
      <span className="travel-prototype">{lang==='en'?'SCROLL-TRAVEL STUDY · YOUR ORIGINAL ARTWORK':'ЭСКИЗ ПУТЕШЕСТВИЯ · ВАШИ ИЗОБРАЖЕНИЯ'}</span>
    </section>
    {JOURNEY.map((scene,index)=><Chapter key={index} {...{scene,index,lang,reduced}} onActive={setActive} onDetails={setDetails}/>)}
    <section className="sh-end"><span>10 / 10</span><h2>{lang === 'en' ? 'The story continues.' : 'История продолжается.'}</h2><Link to="/culture">{lang === 'en' ? 'Explore our living culture' : 'Откройте живую культуру'}<ArrowUpRight/></Link><button onClick={()=>jump(-1)}>{lang === 'en' ? 'Back to the beginning' : 'Вернуться к началу'}</button></section>
    {active >= 0 && !overlay && <nav className="sh-position" aria-label="Chapter position"><span>{String(active+1).padStart(2,'0')} / 10</span><button onClick={()=>setMenu(true)} aria-label={lang==='en'?'Open chapter gallery':'Открыть галерею глав'}><Grid2X2 size={16}/></button></nav>}
    {overlay && <div className="sh-dialog" role="dialog" aria-modal="true" aria-labelledby="sh-dialog-title"><button ref={closeRef} className="sh-close" onClick={()=>{setMenu(false);setDetails(null);}} aria-label="Close"><X/></button>
      {menu ? <><p className="sh-label">ANDARAK / INDEX</p><h2 id="sh-dialog-title">{lang === 'en' ? 'Choose your chapter.' : 'Выберите главу.'}</h2><div className="sh-chapter-gallery">{JOURNEY.map((scene,i)=><button key={i} onClick={()=>jump(i)}><span>{String(i+1).padStart(2,'0')} / {scene.date[lang]}</span><img src={scene.art} alt="" loading="lazy"/><h3>{scene.title[lang].join(' ')}</h3><ArrowUpRight size={19}/></button>)}</div></> : <div className="sh-context"><p className="sh-label">{JOURNEY[details].date[lang]}</p><h2 id="sh-dialog-title">{lang === 'en' ? 'Behind the scene.' : 'Об этой сцене.'}</h2><img src={JOURNEY[details].art} alt=""/><p>{JOURNEY[details].note[lang]}</p></div>}
    </div>}
  </main>;
}
