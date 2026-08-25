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
