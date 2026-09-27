import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import JourneyRail from "./JourneyRail";
import Footer from "./Footer";
import Lightbox from "./Lightbox";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { useUiStore } from "../store/uiStore";
import { META } from "../lib/content";

function setMetaTag(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Layout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const menuOpen = useUiStore((s) => s.menuOpen);
  const closeMenu = useUiStore((s) => s.closeMenu);

  const [navSolid, setNavSolid] = useState(true);
  const [journey, setJourney] = useState({ show: false, current: "", dark: false });

  const forceSolidRef = useRef(true);
  const sectionsRef = useRef([]);

  // On every route change: scroll to top, close menu, set document meta,
  // recompute whether the nav should start transparent (dark hero) or solid.
  useEffect(() => {
    closeMenu();
    window.scrollTo(0, 0);

    const meta = META[location.pathname] || META["404"];
    document.title = meta.t;
    setMetaTag('meta[name="description"]', "content", meta.d);
    setMetaTag('meta[property="og:title"]', "content", meta.t);
    setMetaTag('meta[property="og:description"]', "content", meta.d);

    const raf = requestAnimationFrame(() => {
      const main = mainRef.current;
      const first = main && main.firstElementChild;
      forceSolidRef.current = !(first && first.getAttribute("data-nav") === "dark");
      setNavSolid(forceSolidRef.current || window.pageYOffset > 40);

      sectionsRef.current = main
        ? Array.from(main.querySelectorAll("[data-journey]")).map((el) => ({ el, name: el.getAttribute("data-journey") }))
        : [];
      updateJourney(window.pageYOffset);
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  function updateJourney(y) {
    const sections = sectionsRef.current;
    if (!sections.length) {
      setJourney((j) => (j.show ? { ...j, show: false } : j));
      return;
    }
    const show = y > window.innerHeight * 0.55;
    const mid = y + window.innerHeight / 2;
    let current = sections[0].name;
    let dark = false;
    for (const s of sections) {
      const top = s.el.offsetTop;
      if (mid >= top) {
        current = s.name;
        dark = s.el.classList.contains("dark") || s.el.classList.contains("hero");
      }
    }
    setJourney({ show, current, dark });
  }

  useEffect(() => {
    function onScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      setNavSolid(forceSolidRef.current || y > 40);
      updateJourney(y);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    document.body.classList.toggle("no-scroll", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && menuOpen) closeMenu();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <a className="skip" href="#app">
        Skip to content
      </a>
      <Nav scrolled={navSolid} />
      <MobileMenu />
      <JourneyRail show={journey.show} current={journey.current} dark={journey.dark} />
      <main id="app" ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
      <Lightbox />
      <FloatingWhatsApp />
    </>
  );
}
