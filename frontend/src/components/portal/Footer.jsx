import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { NAV, T } from "@/data/portal";

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
    <footer className="neo-footer" data-testid="portal-footer">
      <div className="neo-footer-top"><span>ANDARAK</span><i>MMXXVI</i></div>
      <div className="neo-footer-grid">
          <div className="neo-footer-statement"><p data-testid="footer-tagline">{T.footerLine[lang]}</p><small>{T.footerContact[lang]} — {T.footerContactSoon[lang]}</small></div>
          <div className="neo-footer-nav">
            {NAV.map((g) => (
              <button
                key={g.id}
                onClick={() => navigate(g.to || (g.items.find((i) => i.to)?.to ?? "/soon"))}
                className="footer-link"
                data-testid={`footer-nav-${g.id}`}
              >
                {g.label[lang]}
              </button>
            ))}
            <Link to="/history" className="footer-link footer-link-hot" data-testid="footer-history-link">
              {lang === "ru" ? "История в огне →" : "A History in Fire →"}
            </Link>
          </div>
      </div>
      <div className="neo-footer-bottom"><p>{T.footerPilot[lang]}</p><button onClick={onLang}>RU / EN</button></div>
    </footer>
  );
}
