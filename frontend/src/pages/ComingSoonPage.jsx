import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { T } from "@/data/portal";
import { KilimDivider } from "@/components/portal/Kilim";

export default function ComingSoonPage({ lang }) {
  return (
    <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-28 lg:py-36 text-left" data-testid="coming-soon-page">
      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <span className="soon-badge mb-6">{T.soonBadge[lang]}</span>
        <h1 className="font-display font-semibold" style={{ fontSize: "clamp(2.3rem, 4.6vw, 4rem)", color: "var(--p-ink)", lineHeight: 1.06 }} data-testid="soon-title">
          {T.soonPageTitle[lang]}
        </h1>
        <div className="mt-5 mb-5"><KilimDivider /></div>
        <p className="text-sm md:text-base max-w-[480px]" style={{ color: "var(--p-slate)", lineHeight: 1.8 }}>
          {T.soonPageText[lang]}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link to="/" className="btn-terra" data-testid="soon-home-button">{T.soonPageBack[lang]}</Link>
          <Link to="/history" className="btn-ghost-dark" data-testid="soon-history-button">{T.heroCta[lang]}</Link>
        </div>
      </motion.div>
    </div>
  );
}
