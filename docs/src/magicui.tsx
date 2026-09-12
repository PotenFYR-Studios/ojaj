import { clsx } from "clsx";

/** Magic UI · Dot Pattern: decorative dotted backdrop (radial-masked). */
export function DotPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern id="ojaj-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="rgba(139,92,246,0.22)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ojaj-dots)" />
    </svg>
  );
}

/** Magic UI · Meteors: streaking comets: the launch theme for the hero. */
export function Meteors({ number = 16 }: { number?: number }) {
  const meteors = Array.from({ length: number }, (_, i) => ({
    id: i,
    left: (i * 137) % 100,
    delay: ((i * 2.3) % 8).toFixed(1),
    dur: (4.5 + ((i * 1.1) % 4)).toFixed(1),
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-brand-orange shadow-[0_0_0_1px_rgba(249,115,22,0.14)] before:absolute before:top-1/2 before:h-px before:w-20 before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#f97316] before:to-transparent before:content-['']"
          style={{
            left: `${m.left}%`,
            top: "-8%",
            animation: `meteor ${m.dur}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes meteor { 0% { transform: rotate(215deg) translateX(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(215deg) translateX(-620px); opacity: 0; } }`}</style>
    </div>
  );
}

/** Ambient glow orb for hero atmosphere (heavily blurred, z-0). */
export function GlowOrb({
  className,
  color = "rgba(139, 92, 246, 0.18)",
  size = 500,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute rounded-full blur-[140px] will-change-transform",
        className,
      )}
      style={{ width: size, height: size, background: color }}
    />
  );
}
