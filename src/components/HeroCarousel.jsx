import { useEffect, useRef, useState } from "react";
import Picture from "./Picture";

const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const INTERVAL_MS = 6000;

const SLIDES = [
  { id: "photo-1600210492493-0946911123ea", label: "Living Room", alt: "Timber-ceiling living room designed by Rishi Home Interior" },
  { id: "photo-1600489000022-c2086d79f9d4", label: "Modular Kitchen", alt: "Forest green modular kitchen designed by Rishi Home Interior" },
  { id: "photo-1566665797739-1674de7a421a", label: "Master Bedroom", alt: "Fluted walnut master bedroom designed by Rishi Home Interior" },
  { id: "photo-1617806118233-18e1de247200", label: "Dining Room", alt: "Emerald velvet dining room designed by Rishi Home Interior" },
  { id: "photo-1618236444721-4a8dba415c15", label: "Wardrobe", alt: "Oak walk-in wardrobe designed by Rishi Home Interior" }
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
      {SLIDES.map((s, i) => (
        <div key={s.id} className={"hero-slide" + (i === index ? " active" : "")} aria-hidden={i !== index}>
          <Picture id={s.id} alt={s.alt} w={2000} h={1125} eager={i === 0} sizes="100vw" ws={[900, 1400, 2000]} />
        </div>
      ))}
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
