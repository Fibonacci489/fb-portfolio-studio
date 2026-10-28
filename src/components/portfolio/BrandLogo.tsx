import { BRAND } from "@/data/content";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: number;
  className?: string;
  /** Adds the metallic ring + glow treatment (hero presentation). */
  framed?: boolean;
}

/**
 * Renders the FB brand mark.
 *
 * If BRAND.logoUrl is set, the real uploaded logo is displayed with
 * object-fit: contain (never stretched or recolored). Until a logo asset is
 * supplied, a refined metallic "FB" monogram placeholder is shown instead.
 */
export function BrandLogo({ size = 96, className, framed = false }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        framed &&
          "shadow-[0_0_60px_oklch(0.846_0.013_255.5/0.18),inset_0_0_0_1px_oklch(0.966_0.005_258.3/0.25)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {BRAND.logoUrl ? (
        <img
          src={BRAND.logoUrl}
          alt={`${BRAND.name} logo`}
          width={size}
          height={size}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      ) : (
        <div
          aria-label={`${BRAND.name} logo (placeholder until the official logo is supplied)`}
          role="img"
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full",
            framed
              ? "bg-[radial-gradient(circle_at_30%_25%,oklch(0.3_0.015_250),oklch(0.14_0.01_246)_70%)]"
              : "bg-[radial-gradient(circle_at_30%_25%,oklch(0.26_0.014_250),oklch(0.15_0.01_246)_75%)]",
          )}
        >
          {framed && (
            <span
              aria-hidden
              className="absolute inset-[6%] rounded-full border border-[oklch(0.966_0.005_258.3/0.22)]"
            />
          )}
          <span
            className="font-display text-metallic leading-none"
            style={{ fontSize: size * 0.34, letterSpacing: "0.02em" }}
          >
            {BRAND.name}
          </span>
        </div>
      )}
    </div>
  );
}
