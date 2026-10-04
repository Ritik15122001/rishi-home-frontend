import { useEffect, useRef, useState } from "react";
import { img, srcset } from "../lib/images";

const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const INTERVAL_MS = 6000;

const SLIDES = [
  { id: "photo-1586023492125-27b2c045efd7", label: "Living Room", alt: "Minimal living room corner with a single accent chair, designed by Rishi Home Interior" },
  { id: "photo-1600489000022-c2086d79f9d4", label: "Modular Kitchen", alt: "Forest green modular kitchen designed by Rishi Home Interior" },
  { id: "photo-1566665797739-1674de7a421a", label: "Master Bedroom", alt: "Fluted walnut master bedroom designed by Rishi Home Interior" },
  { id: "photo-1617806118233-18e1de247200", label: "Dining Room", alt: "Emerald velvet dining room designed by Rishi Home Interior" },
  { id: "photo-1774301211236-dab64d553241", label: "Wardrobe", alt: "Backlit dressing room and wardrobe designed by Rishi Home Interior" }
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (REDUCED) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(i) {
    setIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!REDUCED) {
      timerRef.current = setInterval(() => {
        setIndex((cur) => (cur + 1) % SLIDES.length);
      }, INTERVAL_MS);
    }
  }

  return (
    <>
      {SLIDES.map((s, i) => {
        const eager = i === 0;
        return (
          <div key={s.id} className={"hero-slide" + (i === index ? " active" : "")} aria-hidden={i !== index}>
            <picture>
              {/* Mobile: dedicated portrait crop (4:5) so the tall narrow viewport
                  gets a purpose-cropped frame instead of a thin sliver of a wide
                  landscape image forced through object-fit:cover. */}
              <source
                media="(max-width: 760px)"
                srcSet={[640, 828, 1080].map((w) => `${img(s.id, w, 75, Math.round(w * 1.25))} ${w}w`).join(", ")}
              />
              <img
                src={img(s.id, 2000, 78)}
                srcSet={srcset(s.id, [900, 1400, 2000])}
                sizes="100vw"
                width={2000}
                height={1125}
                alt={s.alt}
                loading={eager ? undefined : "lazy"}
                decoding="async"
                fetchPriority={eager ? "high" : undefined}
              />
            </picture>
          </div>
        );
      })}
      <div className="hero-dots" role="tablist" aria-label="Featured rooms">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === index}
            aria-label={s.label}
            className={i === index ? "on" : ""}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}
