import { useEffect } from "react";

const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const THRESHOLD_RATIO = 0.92; // reveal once an element is within the bottom 8% of the viewport

// Re-runs the reveal-on-scroll animation over .rv / .rvi elements inside `root`
// whenever `deps` changes (i.e. on every route render).
//
// Note: .rvi elements start clipped via `clip-path: inset(0 0 100% 0)`. Chromium
// computes IntersectionObserver ratios against that clipped paint area, so a
// clipped target's intersectionRatio never rises above 0 — a permanent
// deadlock for any non-zero threshold. A plain scroll + rAF check against the
// (unclipped) boundingClientRect sidesteps that entirely and is what's used here.
export default function useReveal(root, deps = []) {
  useEffect(() => {
    const node = root && root.current ? root.current : document;
    const els = Array.from(node.querySelectorAll(".rv, .rvi"));

    if (REDUCED) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    let pending = els.filter((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * THRESHOLD_RATIO) {
        el.classList.add("in");
        return false;
      }
      return true;
    });

    if (!pending.length) return;

    let raf = null;
    function check() {
      raf = null;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * THRESHOLD_RATIO) {
          el.classList.add("in");
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (raf === null) raf = requestAnimationFrame(check);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
