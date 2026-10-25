import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Instagram } from "lucide-react";
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
    <footer className="portal-footer" data-testid="portal-footer">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-5" style={{ borderBottom: "1px solid var(--p-border)" }}>
          <div>
            <p className="font-display italic" style={{ fontSize: 22, lineHeight: 1.35, maxWidth: 340 }} data-testid="footer-tagline">
              {T.footerLine[lang]}
            </p>
            <a
              href="https://www.instagram.com/andarak_720403/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 py-2 footer-link"
              style={{ color: "var(--p-terra)" }}
              data-testid="footer-instagram"
            >
              <Instagram size={20} strokeWidth={1.7} aria-hidden="true" />
              <span>{lang === "ru" ? "Андарак в Instagram" : "Follow Andarak"}</span>
            </a>
          </div>
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1" aria-label={lang === "ru" ? "Навигация внизу страницы" : "Footer navigation"}>
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
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4">
          <p className="text-xs leading-relaxed" style={{ color: "var(--p-slate)", maxWidth: 520 }}>
            {T.footerPilot[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
