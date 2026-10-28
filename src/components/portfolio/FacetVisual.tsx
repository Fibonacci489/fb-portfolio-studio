/**
 * Faceted gemstone placeholder artwork — deterministic per seed so every
 * portfolio / case-study card gets a unique, on-brand black-diamond visual
 * without external images.
 */
export function FacetVisual({
  seed,
  title,
  className,
}: {
  seed: number;
  title: string;
  className?: string;
}) {
  const rand = (n: number) => {
    const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const polygons = Array.from({ length: 9 }, (_, i) => {
    const cx = 10 + rand(i) * 80;
    const cy = 10 + rand(i + 40) * 80;
    const r = 12 + rand(i + 80) * 26;
    const rot = rand(i + 120) * 360;
    const pts = Array.from({ length: 3 + Math.floor(rand(i + 160) * 3) }, (_, k) => {
      const a = rot + (k / 6) * Math.PI * 2;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    const opacity = 0.04 + rand(i + 200) * 0.09;
    return <polygon key={i} points={pts} fill="currentColor" fillOpacity={opacity} />;
  });

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,oklch(0.24_0.015_250),oklch(0.13_0.01_246)_75%)] ${className ?? ""}`}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full text-silver">
        <g>{polygons}</g>
        <line x1="0" y1={(20 + (seed % 40)).toString()} x2="100" y2={(70 - (seed % 40)).toString()} stroke="currentColor" strokeOpacity="0.1" />
        <line x1="0" y1={(70 - (seed % 30)).toString()} x2="100" y2={(25 + (seed % 30)).toString()} stroke="currentColor" strokeOpacity="0.08" />
      </svg>
      <span className="sr-only">{title}</span>
    </div>
  );
}
