import { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation, useOutlet, Navigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "@/App.css";
import Header from "@/components/portal/Header";
import Footer, { EmergencyButton } from "@/components/portal/Footer";
import HomePage from "@/pages/HomePage";
import HistorySlides from "@/pages/HistorySlides";
import CulturePage, { CultureTopicPage } from "@/pages/CulturePage";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import ComingSoonPage from "@/pages/ComingSoonPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    // Culture handles scroll when its new page mounts, after the old page fades.
    if (pathname === "/culture" || pathname.startsWith("/culture/")) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function CultureTransition() {
  const location = useLocation();
  const outlet = useOutlet();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        data-testid="culture-transition"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : -4, transition: { duration: reducedMotion ? 0 : 0.12, ease: "easeOut" } }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}

function PortalLayout({ lang, onLang, theme, onTheme }) {
  return (
    <div className={`portal-root ${theme === "dark" ? "dark" : ""}`} data-testid="portal-root">
      <Header lang={lang} onLang={onLang} theme={theme} onTheme={onTheme} />
      <main>
        <Outlet />
      </main>
      <Footer lang={lang} onLang={onLang} />
      <EmergencyButton lang={lang} />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("andarak-lang") || "ru");
  const [theme, setTheme] = useState(() => localStorage.getItem("andarak-theme") || "light");
  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);
  const onLang = () => {
    setLang((l) => {
      const next = l === "ru" ? "en" : "ru";
      localStorage.setItem("andarak-lang", next);
      return next;
    });
  };
  const onTheme = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("andarak-theme", next);
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/history" element={<HistorySlides lang={lang} onLang={onLang} />} />
        <Route path="/history/classic" element={<Navigate to="/history" replace />} />
        <Route element={<PortalLayout lang={lang} onLang={onLang} theme={theme} onTheme={onTheme} />}>
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/culture" element={<CultureTransition />}>
            <Route index element={<CulturePage lang={lang} />} />
            <Route path=":topicId" element={<CultureTopicPage lang={lang} />} />
          </Route>
          <Route path="/gallery" element={<GalleryPage lang={lang} />} />
          <Route path="/about" element={<AboutPage lang={lang} />} />
          <Route path="/soon" element={<ComingSoonPage lang={lang} />} />
          <Route path="*" element={<ComingSoonPage lang={lang} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
