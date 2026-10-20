import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, X, Moon, Sun, HeartPulse, ShoppingBag, GraduationCap, Bus, Landmark, ShieldCheck, HandHeart, Newspaper, CalendarDays, MessagesSquare, Trophy, Globe, Mail, MapPin } from 'lucide-react';
import { NAV, T } from '@/data/portal';
import '@/visual-menu.css';

const ART = {
  'Culture & Traditions': '/art/journey-4.jpg', Gallery:'/gallery/valley-green.png',
  'About the Project':'/gallery/hero-valley.jpg', 'For Tourists':'/gallery/hero-valley.jpg',
};
const ICONS = {'People & Sport':Trophy,Diaspora:Globe,'Medicine & Pharmacies':HeartPulse,'Business & Shops':ShoppingBag,'Schools & Education':GraduationCap,'Transport & Getting There':Bus,'Administration & Services':Landmark,'Safety & Risks':ShieldCheck,'Scholarships & Grants':GraduationCap,Volunteering:HandHeart,'Village Development':MapPin,'News Feed':Newspaper,'Events Calendar':CalendarDays,'Suggestions & Discussion':MessagesSquare,Contact:Mail,'Support Andarak':HandHeart};

function Card({item,index,lang,onGo}) {
  const Icon = ICONS[item.label.en] || MapPin;
  return <Link className="vm-card" to={item.soon ? `/soon?section=${encodeURIComponent(item.label[lang])}` : item.to} onClick={onGo}>
    <div className="vm-card-title"><h3>{item.label[lang]}</h3><ArrowUpRight size={17}/></div>
    <div className={`vm-art vm-art-${index%5}`}>
      {ART[item.label.en] ? <img src={ART[item.label.en]} alt=""/> : <><i className="vm-orbit"/><span className="vm-icon"><Icon strokeWidth={1.15}/></span><i className="vm-spark">✦</i></>}
      {item.soon && <span className="vm-soon">{T.soonBadge[lang]}</span>}
    </div>
  </Link>;
}

export default function VisualHeader({lang,onLang,theme,onTheme}) {
  const [expanded,setExpanded] = useState(null);
  const [mobile,setMobile] = useState(false);
  const ref = useRef(null);
  const trigger = useRef(null);
  const location = useLocation();
  const reduced = useReducedMotion();
  const group = NAV.find(g=>g.id===expanded);
  const close = () => {setExpanded(null);setMobile(false);};
  useEffect(()=>{setExpanded(null);setMobile(false);},[location.pathname,location.search]);
  useEffect(()=>{
    if(!expanded && !mobile) return;
    const outside = e => {if(!ref.current?.contains(e.target)){setExpanded(null);setMobile(false);}};
    const key = e => {if(e.key==='Escape'){setExpanded(null);setMobile(false);trigger.current?.focus();}};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',key);
    return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',key);};
  },[expanded,mobile]);
  const toggle = (id,e) => {trigger.current=e.currentTarget;setExpanded(v=>v===id?null:id);};
  return <header ref={ref} className="vm-header" data-testid="portal-header">
    <div className="vm-bar"><Link to="/" onClick={close} className="vm-brand">✦ <span>{T.brand[lang]}</span></Link>
      <nav className="vm-desktop" aria-label={lang==='en'?'Main navigation':'Главная навигация'}>{NAV.map(g=>g.to?<Link key={g.id} to={g.to} data-testid={`nav-${g.id}`}>{g.label[lang]}</Link>:<button key={g.id} onClick={e=>toggle(g.id,e)} aria-expanded={expanded===g.id} aria-controls="visual-navigation-panel" data-testid={`nav-${g.id}`}>{g.label[lang]}<ChevronDown size={12}/></button>)}</nav>
      <div className="vm-actions"><button onClick={onLang} aria-label="Switch language" data-testid="portal-lang-toggle">{lang.toUpperCase()}</button><button onClick={onTheme} aria-label="Theme" data-testid="theme-toggle">{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}</button><button className="vm-mobile-toggle" onClick={e=>{trigger.current=e.currentTarget;setMobile(v=>!v);setExpanded(null);}} aria-label="Menu" aria-expanded={mobile} data-testid="mobile-menu-open">{mobile?<X size={21}/>:<Menu size={21}/>}</button></div>
    </div>
    {mobile && <nav className="vm-mobile-nav" aria-label="Main navigation">{NAV.map(g=>g.to?<Link key={g.id} to={g.to} onClick={close}>{g.label[lang]}<ArrowUpRight size={15}/></Link>:<button key={g.id} onClick={e=>toggle(g.id,e)} aria-expanded={expanded===g.id}>{g.label[lang]}<ChevronDown size={15}/></button>)}</nav>}
    <AnimatePresence mode="wait">{group?.items && <motion.div key={group.id} id="visual-navigation-panel" className="vm-panel" initial={reduced?false:{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.25}}>
      <div className="vm-panel-heading"><span>{group.label[lang]}</span><button onClick={()=>{setExpanded(null);trigger.current?.focus();}} aria-label="Close menu"><X size={19}/></button></div>
      <div className="vm-grid" style={{'--vm-count':Math.min(group.items.length,5)}}>{group.items.map((item,i)=><Card key={item.label.en} {...{item,lang}} index={i} onGo={close}/>)}</div>
      <div className="vm-panel-footer"><span>{lang==='en'?'Discover the people, places and stories of Andarak.':'Откройте людей, места и истории Андарака.'}</span><Link to="/history" onClick={close}>{lang==='en'?'Explore our history':'Откройте историю'}<ArrowUpRight size={16}/></Link></div>
    </motion.div>}</AnimatePresence>
  </header>;
}
