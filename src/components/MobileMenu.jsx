import { NavLink } from "react-router-dom";
import { BRAND, NAV } from "../lib/content";
import { useUiStore } from "../store/uiStore";
import { Arrow } from "../lib/icons";

export default function MobileMenu() {
  const closeMenu = useUiStore((s) => s.closeMenu);
  const menuOpen = useUiStore((s) => s.menuOpen);

  return (
    <div className="mobile" id="mobileMenu" aria-hidden={!menuOpen}>
      <nav id="mobileLinks" aria-label="Mobile">
        {NAV.map((n, i) => (
          <NavLink key={n.href} to={n.href} end={n.href === "/"} onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
            <span>0{i + 1}</span>
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="mobile-foot">
        <span className="label on-dark">Speak to a designer</span>
        <a className="tel" href={BRAND.phoneHref}>
          {BRAND.phone}
        </a>
        <NavLink className="btn btn-light" to="/contact" onClick={closeMenu}>
          Book Consultation <Arrow />
        </NavLink>
      </div>
    </div>
  );
}
