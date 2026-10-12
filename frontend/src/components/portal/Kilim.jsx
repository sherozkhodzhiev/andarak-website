// Keep existing imports working without rendering the decorative diamond row.
export const KilimDivider = () => null;

export const KilimWatermark = ({ className = "" }) => (
  <svg className={className} width="360" height="360" viewBox="0 0 360 360" fill="none" aria-hidden="true">
    {Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 6 }, (_, c) => (
        <rect key={`${r}-${c}`} x={c * 60 + 15} y={r * 60 + 15} width="30" height="30" transform={`rotate(45 ${c * 60 + 30} ${r * 60 + 30})`} stroke="#1A2433" strokeWidth="1" fill="none" />
      ))
    )}
  </svg>
);
