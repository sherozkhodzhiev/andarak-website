export const KilimDivider = ({ color = "#C25934", opacity = 0.55 }) => (
  <svg width="120" height="12" viewBox="0 0 120 12" fill="none" aria-hidden="true" style={{ opacity }}>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={i * 12 + 3} y="3" width="6" height="6" transform={`rotate(45 ${i * 12 + 6} 6)`} fill={i % 2 ? color : "#D4AF37"} />
    ))}
  </svg>
);

export const KilimWatermark = ({ className = "" }) => (
  <svg className={className} width="360" height="360" viewBox="0 0 360 360" fill="none" aria-hidden="true">
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 6 }, (_, c) => (
        <rect key={`${r}-${c}`} x={c * 60 + 15} y={r * 60 + 15} width="30" height="30" transform={`rotate(45 ${c * 60 + 30} ${r * 60 + 30})`} stroke="#1A2433" strokeWidth="1" fill="none" />
      ))
    )}
  </svg>
);
