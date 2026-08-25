import { UI } from "@/data/chapters";

export default function Marquee({ lang }) {
  const row = [...UI.marqueeItems[lang], ...UI.marqueeItems[lang], ...UI.marqueeItems[lang]];
  return (
    <div
      className="relative overflow-hidden py-14"
      style={{
        borderTop: "1px solid rgba(201,162,39,.4)",
        borderBottom: "1px solid rgba(201,162,39,.4)",
        background: "rgba(11,10,8,.55)",
      }}
      data-testid="era-marquee"
      aria-hidden="true"
    >
      <div className="marquee-track" style={{ animationDuration: "48s" }}>
        {[0, 1].map((n) => (
          <span key={n} className="flex items-center whitespace-nowrap">
            {row.map((item, i) => (
              <span key={i} className="flex items-center">
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.8rem, 3.6vw, 3.2rem)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: ".02em",
                    color: "rgba(237,227,208,.6)",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    width: 7, height: 7, flexShrink: 0,
                    background: "var(--ember)",
                    transform: "rotate(45deg)",
                    margin: "0 36px",
                  }}
                />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
