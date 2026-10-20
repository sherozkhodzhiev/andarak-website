import { useEffect, useRef } from "react";

const TARGET = 0.55;
const LOAD_TIMEOUT = 15000;

function fade(audio, to, ms, done) {
  const from = audio.volume;
  const start = performance.now();
  let frame;
  let cancelled = false;
  const step = (t) => {
    if (cancelled) return;
    const k = Math.min((t - start) / ms, 1);
    try { audio.volume = from + (to - from) * k; } catch (e) { /* element released */ }
    if (k < 1) frame = requestAnimationFrame(step);
    else if (done) done();
  };
  frame = requestAnimationFrame(step);
  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };
}

export function useTrack(on, url, onError) {
  const curRef = useRef(null);
  const playersRef = useRef(new Set());
  const errorRef = useRef(onError);
  const desiredRef = useRef({ on, url });
  errorRef.current = onError;
  desiredRef.current = { on, url };

  useEffect(() => {
    const prev = curRef.current;
    if (prev) {
      prev.active = false;
      prev.cancelFade();
      curRef.current = null;
      // A pending play() must not start after the user has muted or moved on.
      if (!prev.started) prev.release();
      else prev.cancelFade = fade(prev.audio, 0, 1200, prev.release);
    }
    if (!on || !url) return undefined;

    let audio;
    try { audio = new Audio(url); } catch (error) {
      errorRef.current?.(url, error);
      return undefined;
    }
    const track = {
      audio, active: true, started: false, released: false,
      cancelFade: () => {}, timer: null, release: null,
    };
    const isCurrent = () => !track.released && track.active &&
      curRef.current === track && desiredRef.current.on && desiredRef.current.url === url;

    track.release = () => {
      if (track.released) return;
      track.released = true;
      track.active = false;
      track.cancelFade();
      clearTimeout(track.timer);
      audio.removeEventListener("error", mediaError);
      try {
        audio.pause();
        audio.removeAttribute("src");
        audio.load(); // Abort pending media requests and release the decoder.
      } catch (e) { /* element already released */ }
      playersRef.current.delete(track);
      if (curRef.current === track) curRef.current = null;
    };
    const fail = (error) => {
      const shouldReport = isCurrent();
      track.release();
      if (shouldReport) errorRef.current?.(url, error);
    };
    const mediaError = () => fail(audio.error || new Error("Soundtrack could not be loaded."));

    playersRef.current.add(track);
    curRef.current = track;
    audio.loop = true;
    audio.volume = 0;
    audio.addEventListener("error", mediaError);
    track.timer = setTimeout(() => fail(new Error("Soundtrack loading timed out.")), LOAD_TIMEOUT);
    try {
      Promise.resolve(audio.play()).then(() => {
        clearTimeout(track.timer);
        if (!isCurrent()) {
          // A delayed browser promise can settle even after its source was removed.
          try { audio.pause(); } catch (e) { /* element already released */ }
          track.release();
          return;
        }
        track.started = true;
        track.cancelFade = fade(audio, TARGET, 1600);
      }, fail);
    } catch (error) {
      fail(error);
    }
    return undefined;
  }, [on, url]);

  useEffect(
    () => () => {
      // Crossfading players are no longer in curRef, but still need disposal.
      for (const track of [...playersRef.current]) track.release();
      curRef.current = null;
    },
    []
  );
}
