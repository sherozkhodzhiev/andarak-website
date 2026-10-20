import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import "@/App.css";
import "@/calm-portal.css";

import Header from "@/components/portal/VisualHeader";
import Footer, { EmergencyButton } from "@/components/portal/Footer";
import HomePage from "@/pages/HomePage";
import HistoryPage from "@/pages/ScrollHistory";
import CulturePage from "@/pages/CulturePage";
import GalleryPage from "@/pages/GalleryPage";
import AboutPage from "@/pages/AboutPage";
import ComingSoonPage from "@/pages/ComingSoonPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PortalLayout({ lang, onLang, theme, onTheme }) {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.88,
    });

    let frame;

    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className={`portal-root ${theme === "dark" ? "dark" : ""}`}
      data-testid="portal-root"
    >
      <Header
        lang={lang}
        onLang={onLang}
        theme={theme}
        onTheme={onTheme}
      />

      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer lang={lang} onLang={onLang} />
      <EmergencyButton lang={lang} />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("andarak-lang") || "ru"
  );

  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem("andarak-palette") !== "calm") {
      localStorage.setItem("andarak-palette", "calm");
      localStorage.setItem("andarak-theme", "light");
      return "light";
    }

    return localStorage.getItem("andarak-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onLang = () => {
    setLang((current) => {
      const next = current === "ru" ? "en" : "ru";
      localStorage.setItem("andarak-lang", next);
      return next;
    });
  };

  const onTheme = () => {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem("andarak-theme", next);
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route
          path="/history"
          element={<HistoryPage initialLang={lang} onLang={onLang} />}
        />

        <Route
          path="/history/classic"
          element={<Navigate to="/history" replace />}
        />

        <Route
          element={
            <PortalLayout
              lang={lang}
              onLang={onLang}
              theme={theme}
              onTheme={onTheme}
            />
          }
        >
          <Route path="/" element={<HomePage lang={lang} />} />
          <Route path="/culture" element={<CulturePage lang={lang} />} />
          <Route path="/gallery" element={<GalleryPage lang={lang} />} />
          <Route path="/about" element={<AboutPage lang={lang} />} />
          <Route path="/soon" element={<ComingSoonPage lang={lang} />} />
          <Route path="*" element={<ComingSoonPage lang={lang} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}