import HeaderWeather from "./HeaderWeather";  
import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon, MapPin } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV, T } from "@/data/portal";

export default function Header({ lang, onLang, theme, onTheme }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const go = (item) => {
    setOpen(false);
    navigate(item.soon ? "/soon" : item.to);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "var(--p-surface)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid var(--p-border)" }}
      data-testid="portal-header"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-5 lg:px-8" style={{ height: 68 }}>
        <Link to="/" className="relative isolate flex shrink-0 items-end justify-center group" style={{ width: 124, height: 56, paddingBottom: 4 }} data-testid="header-logo">
          <svg viewBox="0 0 480 240" fill="none" aria-hidden="true" focusable="false"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ color: "var(--p-terra)", opacity: 0.38 }}>
            <path d="M8 208 L91 125 Q103 112 116 123 L131 133 L229 20 Q236 11 245 21 L326 115 L341 103 Q351 96 363 108 L471 208"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <path d="M131 133 L182 94 L161 137 L145 151 M236 24 L225 78 L204 105 L232 99 L225 125 L300 205 M258 87 L266 110 L284 125 M344 105 L340 133 L356 153"
              stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="relative font-display font-bold tracking-[.08em]" style={{ fontSize: 20, color: "var(--p-ink)" }}>{T.brand[lang]}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
          {NAV.map((group) =>
            group.to ? (
              <NavLink
                key={group.id}
                to={group.to}
                className="portal-nav-link"
                data-testid={`nav-${group.id}`}
              >
                {group.label[lang]}
              </NavLink>
            ) : (
              <DropdownMenu key={group.id}>
                <DropdownMenuTrigger className="portal-nav-link flex items-center gap-1 outline-none" data-testid={`nav-${group.id}`}>
                  {group.label[lang]}
                  <ChevronDown size={13} strokeWidth={2} style={{ opacity: 0.55 }} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="rounded-none min-w-[240px]"
                  style={{ background: "var(--p-bg)", border: "1px solid var(--p-border)", boxShadow: "0 14px 40px rgba(26,36,51,.10)", color: "var(--p-ink)" }}
                >
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.label.en}
                      onClick={() => go(item)}
                      className="cursor-pointer rounded-none py-2.5 px-3 focus:bg-[var(--p-bg2)] focus:text-[var(--p-ink)] flex items-center justify-between gap-4"
                      data-testid={`navitem-${item.label.en.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    >
                      <span className="text-[13.5px]">{item.label[lang]}</span>
                      {item.soon && <span className="soon-badge">{T.soonBadge[lang]}</span>}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </nav>

                <div className="header-actions flex items-center gap-2.5">
          <a
            href="https://www.google.com/maps/place/Andarak,+Kyrgyzstan/@39.7683356,69.4691706,14z/data=!3m1!4b1!4m6!3m5!1s0x38b1179280874d8f:0xe0fe2e33e9046af2!8m2!3d39.768282!4d69.4724952!16s%2Fm%2F03wc2x2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center w-11 h-11 rounded-full hover:bg-[var(--p-bg2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-terra)]"
            style={{ color: "var(--p-terra)" }}
            aria-label={lang === "ru" ? "Открыть карту Андарака" : "Open Andarak map"}
            title={lang === "ru" ? "Андарак на карте" : "Andarak on Google Maps"}
            data-testid="header-map"
          >
            <MapPin size={22} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <HeaderWeather lang={lang} />

          <div
            className="header-language"
            role="group"
            aria-label={lang === "ru" ? "Язык" : "Language"}
            data-testid="portal-lang-toggle"
          >
            <button
              type="button"
              lang="en"
              aria-label="English"
              aria-pressed={lang === "en"}
              onClick={() => {
                if (lang !== "en") onLang();
              }}
            >
              EN
            </button>

            <button
              type="button"
              lang="ru"
              aria-label="Русский"
              aria-pressed={lang === "ru"}
              onClick={() => {
                if (lang !== "ru") onLang();
              }}
            >
              RU
            </button>
          </div>
          <button onClick={onTheme} className="theme-pill" aria-label="Theme" data-testid="theme-toggle">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setOpen(true)}
            aria-label="Menu"
            data-testid="mobile-menu-open"
            style={{ color: "var(--p-ink)" }}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden flex flex-col"
            style={{ background: "var(--p-bg)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-5" style={{ height: 68, borderBottom: "1px solid var(--p-border)" }}>
              <span className="font-display font-bold tracking-[.08em]" style={{ fontSize: 20, color: "var(--p-ink)" }}>{T.brand[lang]}</span>
              <button onClick={() => setOpen(false)} aria-label="Close" data-testid="mobile-menu-close" style={{ color: "var(--p-ink)" }}>
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              {NAV.map((group) =>
                group.to ? (
                  <button key={group.id} onClick={() => go(group)} className="mobile-nav-row font-display" data-testid={`mnav-${group.id}`}>
                    {group.label[lang]}
                  </button>
                ) : (
                  <div key={group.id} style={{ borderBottom: "1px solid var(--p-border2)" }}>
                    <button
                      className="mobile-nav-row font-display flex items-center justify-between w-full"
                      style={{ borderBottom: "none" }}
                      onClick={() => setExpanded(expanded === group.id ? null : group.id)}
                      data-testid={`mnav-${group.id}`}
                    >
                      {group.label[lang]}
                      <ChevronDown size={18} style={{ transform: expanded === group.id ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
                    </button>
                    <AnimatePresence>
                      {expanded === group.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          {group.items.map((item) => (
                            <button key={item.label.en} onClick={() => go(item)} className="flex items-center justify-between w-full py-2.5 pl-4 pr-1 text-left" style={{ color: "var(--p-slate)", fontSize: 15 }}>
                              {item.label[lang]}
                              {item.soon && <span className="soon-badge">{T.soonBadge[lang]}</span>}
                            </button>
                          ))}
                          <div style={{ height: 10 }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              )}
              <div className="flex items-center gap-3 mt-8">
                <button onClick={() => { onLang(); }} className="lang-pill" data-testid="mobile-lang-toggle">
                  <span style={{ color: lang === "ru" ? "var(--p-terra)" : "var(--p-slate)" }}>RU</span>
                  <span style={{ color: "var(--p-border)" }}>/</span>
                  <span style={{ color: lang === "en" ? "var(--p-terra)" : "var(--p-slate)" }}>EN</span>
                </button>
                <button onClick={onTheme} className="theme-pill" aria-label="Theme" data-testid="mobile-theme-toggle">
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
