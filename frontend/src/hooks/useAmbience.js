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
