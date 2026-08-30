import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { NAV, T } from "@/data/portal";
import { KilimDivider } from "@/components/portal/Kilim";
import Wisdom from "@/components/portal/Wisdom";

export function EmergencyButton({ lang }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-5 right-5 z-[70] flex items-center justify-center rounded-full"
        style={{ width: 52, height: 52, background: "var(--p-terra)", color: "#F8F7F3", boxShadow: "0 10px 30px rgba(194,89,52,.4)" }}
        onClick={() => setOpen(true)}
        aria-label={T.emergency[lang]}
        data-testid="emergency-button"
      >
        <Phone size={21} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4"
            style={{ background: "rgba(26,36,51,.55)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            data-testid="emergency-modal"
          >
            <motion.div
              className="w-full max-w-sm p-7"
              style={{ background: "var(--p-bg)", border: "1px solid var(--p-border)" }}
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold" style={{ fontSize: 22, color: "var(--p-ink)" }}>{T.emergency[lang]}</h3>
                <button onClick={() => setOpen(false)} aria-label="Close" data-testid="emergency-close" style={{ color: "var(--p-slate)" }}><X size={20} /></button>
              </div>
              {T.emergencyItems[lang].map(([num, label]) => (
                <a key={num} href={`tel:${num}`} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--p-border2)" }} data-testid={`emergency-${num}`}>
                  <span style={{ color: "var(--p-slate)", fontSize: 14 }}>{label}</span>
                  <span className="font-display font-bold" style={{ fontSize: 24, color: "var(--p-terra)" }}>{num}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Footer({ lang, onLang }) {
  const navigate = useNavigate();
  return (
    <footer style={{ background: "#16202E", color: "#F8F7F3" }} data-testid="portal-footer">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 pb-12" style={{ borderBottom: "1px solid rgba(248,247,243,.12)" }}>
          <div>
            <p className="font-display italic" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)", lineHeight: 1.25 }} data-testid="footer-tagline">
              {T.footerLine[lang]}
            </p>
            <div className="mt-6"><KilimDivider /></div>
            <p className="mt-6 font-mono-d text-[11px] tracking-[.08em] uppercase" style={{ color: "rgba(248,247,243,.45)" }}>
              {T.footerContact[lang]}: {T.footerContactSoon[lang]}
            </p>
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(248,247,243,.1)", maxWidth: 460 }}>
              <Wisdom lang={lang} variant="line" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {NAV.map((g) => (
              <button
                key={g.id}
                onClick={() => navigate(g.to || (g.items.find((i) => i.to)?.to ?? "/soon"))}
                className="text-left py-1.5 footer-link"
                data-testid={`footer-nav-${g.id}`}
              >
                {g.label[lang]}
              </button>
            ))}
            <Link to="/history" className="py-1.5 footer-link" style={{ color: "var(--p-gold)" }} data-testid="footer-history-link">
              {lang === "ru" ? "История в огне →" : "A History in Fire →"}
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
          <p className="font-mono-d text-[10px] tracking-[.12em] uppercase" style={{ color: "rgba(248,247,243,.35)", maxWidth: 520 }}>
            {T.footerPilot[lang]}
          </p>
        </div>
        <p className="font-mono-d text-[10px] tracking-[.2em] uppercase mt-8" style={{ color: "rgba(248,247,243,.3)" }}>
          Andarak — MMXXVI
        </p>
      </div>
    </footer>
  );
}
