import { UI } from "@/data/chapters";

export default function Marquee({ lang }) {
  const text = UI.marquee[lang];
  return (
    <div
      className="relative overflow-hidden py-14"
      style={{ borderTop: "1px solid rgba(237,227,208,.08)", borderBottom: "1px solid rgba(237,227,208,.08)" }}
      data-testid="era-marquee"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <span
            key={n}
            className="font-display whitespace-nowrap pr-4"
            style={{
              fontSize: "clamp(1.6rem, 3.4vw, 3rem)",
              fontStyle: "italic",
              color: "rgba(237,227,208,.16)",
            }}
          >
            {text.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  );
}
