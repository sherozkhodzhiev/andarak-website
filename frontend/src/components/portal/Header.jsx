import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV, T } from "@/data/portal";

export default function Header({ lang, onLang }) {
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
      style={{ background: "rgba(248,247,243,.86)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(209,207,199,.6)" }}
      data-testid="portal-header"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-5 lg:px-8" style={{ height: 68 }}>
        <Link to="/" className="flex items-center group" data-testid="header-logo">
          <span className="font-display font-bold tracking-[.08em]" style={{ fontSize: 20, color: "var(--p-ink)" }}>{T.brand[lang]}</span>
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
                  style={{ background: "#F8F7F3", border: "1px solid #D1CFC7", boxShadow: "0 14px 40px rgba(26,36,51,.10)", color: "var(--p-ink)" }}
                >
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.label.en}
                      onClick={() => go(item)}
                      className="cursor-pointer rounded-none py-2.5 px-3 focus:bg-[#EAE7DF] focus:text-[#1A2433] flex items-center justify-between gap-4"
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

        <div className="flex items-center gap-3">
          <button onClick={onLang} className="lang-pill" data-testid="portal-lang-toggle">
            <span style={{ color: lang === "ru" ? "var(--p-terra)" : "var(--p-slate)" }}>RU</span>
            <span style={{ color: "var(--p-border)" }}>/</span>
            <span style={{ color: lang === "en" ? "var(--p-terra)" : "var(--p-slate)" }}>EN</span>
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
            style={{ background: "#F8F7F3" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-testid="mobile-menu"
          >
            <div className="flex items-center justify-between px-5" style={{ height: 68, borderBottom: "1px solid #D1CFC7" }}>
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
                  <div key={group.id} style={{ borderBottom: "1px solid #E3E0D8" }}>
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
              <button onClick={() => { onLang(); }} className="lang-pill mt-8" data-testid="mobile-lang-toggle">
                <span style={{ color: lang === "ru" ? "var(--p-terra)" : "var(--p-slate)" }}>RU</span>
                <span style={{ color: "var(--p-border)" }}>/</span>
                <span style={{ color: lang === "en" ? "var(--p-terra)" : "var(--p-slate)" }}>EN</span>
              </button>
            </div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
