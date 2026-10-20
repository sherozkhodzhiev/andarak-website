import { useEffect, useRef } from 'react';

// A continuous, scroll-driven stellar ribbon. Canvas avoids thousands of DOM nodes.
export default function CosmicField({ reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, frame, time = 0;
    let seed = 42;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const stars = Array.from({ length: 1900 }, () => ({ angle: random()*Math.PI*2, depth: random(), spread: random(), size: random(), warm: random() > .94 }));
    const resize = () => { w = window.innerWidth; h = window.innerHeight; const d = Math.min(window.devicePixelRatio || 1, 1.5); canvas.width = w*d; canvas.height = h*d; ctx.setTransform(d,0,0,d,0,0); };
    const draw = () => {
      const travel = window.scrollY / Math.max(h,1);
      ctx.clearRect(0,0,w,h);
      const cx = w*.5 + Math.sin(travel*.22)*w*.07, cy = h*.47;
      const glow = ctx.createRadialGradient(cx,cy,0,cx,cy,w*.65);
      glow.addColorStop(0,'#082740'); glow.addColorStop(.45,'#06162e'); glow.addColorStop(1,'#020712');
      ctx.fillStyle=glow; ctx.fillRect(0,0,w,h);
      for (const s of stars) {
        const z = ((s.depth + travel*.055 + time*.000018) % 1);
        const radius = (50 + z*z*Math.max(w,h)*.8) * (.76+s.spread*.36);
        const a = s.angle + z*2.8 + travel*.065;
        const x = cx + Math.cos(a)*radius*1.22, y = cy + Math.sin(a)*radius*.68;
        const size = .35+s.size*z*1.8;
        ctx.globalAlpha = .15+z*.65;
        ctx.fillStyle = s.warm ? '#ffd7a2' : s.size>.7 ? '#b8edff' : '#408dcf';
        ctx.beginPath(); ctx.arc(x,y,size,0,Math.PI*2); ctx.fill();
        if (s.size > .96) { ctx.strokeStyle='#88d7ff'; ctx.lineWidth=.5; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(a)*z*14,y+Math.sin(a)*z*9); ctx.stroke(); }
      }
      ctx.globalAlpha=1;
      if (!reduced && !document.hidden) { time++; frame=requestAnimationFrame(draw); }
    };
    const refresh = () => { cancelAnimationFrame(frame); draw(); };
    const onResize = () => { resize(); refresh(); };
    resize(); draw();
    window.addEventListener('resize',onResize);
    document.addEventListener('visibilitychange',refresh);
    if(reduced) window.addEventListener('scroll',refresh,{passive:true});
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize',onResize); document.removeEventListener('visibilitychange',refresh); window.removeEventListener('scroll',refresh); };
  }, [reduced]);
  return <canvas ref={ref} className="cosmic-field" aria-hidden="true"/>;
}
