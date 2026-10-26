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
          <svg viewBox="0 0 480 202" fill="none" aria-hidden="true" focusable="false"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ color: "var(--p-terra)", opacity: 0.38 }}>
            <path fill="currentColor" fillRule="evenodd" d="M127,166 L129,167 L129,169 L131,170 L131,172 L133,173 L133,175 L136,177 L136,179 L137,179 L137,181 L140,183 L140,185 L143,187 L143,189 L145,190 L145,192 L148,194 L147,197 L6,197 L6,196 L4,195 L5,192 L6,192 L8,189 L10,189 L18,180 L20,180 L28,171 L30,171 L38,162 L40,162 L48,153 L50,153 L57,145 L59,145 L73,130 L75,130 L75,129 L76,129 L89,115 L91,115 L102,103 L106,102 L107,100 L118,99 L118,100 L124,101 L124,102 L126,102 L126,103 L132,105 L133,107 L139,107 L139,106 L164,82 L164,80 L179,66 L179,64 L191,53 L191,51 L207,36 L207,34 L215,27 L215,25 L220,22 L220,20 L226,15 L226,13 L227,13 L231,8 L233,8 L233,7 L235,7 L235,6 L245,6 L245,7 L247,7 L247,8 L256,16 L256,18 L262,23 L262,25 L270,32 L270,34 L276,39 L276,41 L282,46 L282,48 L291,56 L291,58 L297,63 L297,65 L298,65 L298,66 L302,69 L302,71 L311,79 L311,81 L317,86 L317,88 L318,88 L322,93 L325,93 L325,92 L326,92 L332,85 L334,85 L337,81 L339,81 L340,79 L342,79 L342,78 L344,78 L344,77 L347,77 L347,76 L357,76 L357,77 L363,79 L364,81 L366,81 L366,82 L367,82 L370,86 L372,86 L372,87 L374,88 L374,90 L380,95 L380,97 L384,100 L384,102 L387,104 L387,106 L388,106 L388,107 L391,109 L391,111 L395,114 L395,116 L398,118 L398,120 L399,120 L433,155 L435,155 L442,163 L444,163 L453,173 L455,173 L464,183 L466,183 L466,184 L472,189 L472,192 L473,192 L472,194 L467,194 L467,193 L465,193 L465,192 L462,191 L459,187 L455,186 L455,185 L454,185 L453,183 L451,183 L449,180 L447,180 L446,178 L444,178 L441,174 L439,174 L436,170 L434,170 L432,167 L430,167 L427,163 L425,163 L425,162 L421,159 L419,156 L417,156 L417,155 L390,129 L390,127 L382,120 L382,118 L381,118 L381,117 L379,116 L379,114 L374,110 L374,108 L369,104 L369,102 L368,102 L360,93 L358,93 L357,91 L355,91 L355,90 L353,90 L353,89 L347,90 L346,93 L345,93 L345,95 L346,95 L346,103 L347,103 L348,109 L349,109 L349,111 L350,111 L350,114 L351,114 L351,117 L352,117 L352,120 L353,120 L353,124 L354,124 L354,127 L355,127 L355,132 L356,132 L356,141 L355,141 L355,142 L352,142 L352,141 L345,135 L345,133 L343,133 L343,131 L333,122 L333,120 L324,112 L324,110 L318,105 L318,103 L309,95 L309,93 L300,85 L300,83 L293,77 L293,75 L284,67 L284,65 L276,58 L276,56 L269,50 L269,48 L268,48 L268,47 L263,43 L263,41 L256,35 L256,33 L255,33 L242,19 L240,19 L240,20 L239,20 L239,26 L238,26 L238,37 L239,37 L238,59 L237,59 L237,63 L236,63 L236,66 L235,66 L235,68 L234,68 L233,74 L232,74 L232,76 L231,76 L231,79 L230,79 L230,81 L229,81 L229,83 L228,83 L228,86 L227,86 L227,88 L226,88 L226,90 L225,90 L224,100 L227,101 L227,102 L229,102 L229,103 L231,103 L231,104 L235,104 L235,105 L238,107 L239,111 L241,112 L242,116 L246,119 L246,121 L247,121 L266,141 L268,141 L268,142 L269,142 L278,152 L280,152 L290,163 L292,163 L297,169 L299,169 L306,177 L308,177 L315,185 L317,185 L317,186 L318,186 L323,192 L325,192 L327,195 L326,195 L325,197 L236,197 L236,196 L220,196 L220,195 L212,194 L212,193 L209,192 L207,189 L205,189 L203,186 L201,186 L200,184 L198,184 L195,180 L193,180 L191,177 L189,177 L188,175 L186,175 L186,174 L185,174 L183,171 L181,171 L178,167 L176,167 L174,164 L172,164 L170,161 L168,161 L168,160 L167,160 L165,157 L163,157 L160,153 L158,153 L156,150 L154,150 L150,145 L148,145 L146,142 L144,142 L141,138 L139,138 L138,136 L136,136 L132,131 L130,131 L126,126 L124,126 L122,123 L120,123 L120,122 L119,122 L118,120 L116,120 L115,118 L113,118 L113,119 L100,131 L100,133 L95,137 L95,139 L93,140 L93,142 L90,144 L89,148 L87,149 L85,155 L88,156 L88,155 L94,154 L94,153 L96,153 L97,151 L103,149 L103,148 L106,147 L106,146 L113,145 L113,146 L116,147 L117,151 L119,152 L119,154 L121,155 L121,157 L123,158 L123,160 L124,160 L124,162 L126,163 Z  M161,114 L161,115 L157,118 L157,120 L156,120 L157,122 L163,121 L163,120 L165,120 L165,119 L169,119 L169,118 L172,118 L172,117 L176,117 L177,115 L179,115 L179,114 L181,113 L181,111 L182,111 L183,108 L186,106 L188,100 L190,99 L191,95 L192,95 L193,92 L194,92 L194,90 L195,90 L195,88 L196,88 L196,86 L197,86 L198,84 L196,83 L195,85 L191,86 L191,87 L190,87 L189,89 L187,89 L183,94 L181,94 L177,99 L175,99 L175,100 L162,112 L162,114 Z  M270,98 L289,116 L289,119 L288,119 L284,124 L282,124 L282,125 L277,125 L277,124 L271,119 L271,117 L270,117 L268,114 L267,114 L266,110 L263,108 L263,106 L261,105 L261,103 L260,103 L260,101 L258,100 L258,98 L256,97 L256,95 L255,95 L255,93 L254,93 L254,91 L253,91 L253,89 L252,89 L252,85 L255,84 L259,89 L261,89 L261,90 L262,90 L267,96 L269,96 Z " />
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
