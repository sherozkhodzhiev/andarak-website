import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import "@/App.css";
import Header from "@/components/portal/Header";
import Footer, { EmergencyButton } from "@/components/portal/Footer";
import HomePage from "@/pages/HomePage";
import HistorySlides from "@/pages/HistorySlides";
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
