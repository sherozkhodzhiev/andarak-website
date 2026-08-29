import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import "@/App.css";
import Header from "@/components/portal/Header";
import Footer, { EmergencyButton } from "@/components/portal/Footer";
import HomePage from "@/pages/HomePage";
import HistoryPage from "@/pages/HistoryPage";
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

function PortalLayout({ lang, onLang }) {
  return (
    <div className="portal-root" data-testid="portal-root">
      <Header lang={lang} onLang={onLang} />
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
  const onLang = () => {
    setLang((l) => {
      const next = l === "ru" ? "en" : "ru";
      localStorage.setItem("andarak-lang", next);
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/history" element={<HistoryPage initialLang={lang} />} />
        <Route element={<PortalLayout lang={lang} onLang={onLang} />}>
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
