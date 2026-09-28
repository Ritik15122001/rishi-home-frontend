import { NavLink } from "react-router-dom";
import { NAV } from "../lib/content";
import { useUiStore } from "../store/uiStore";
import logoWordmark from "../assets/logo-wordmark.png";

export default function Nav({ scrolled }) {
  const menuOpen = useUiStore((s) => s.menuOpen);
  const toggleMenu = useUiStore((s) => s.toggleMenu);

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")} id="nav">
      <div className="nav-in">
        <NavLink className="brand" to="/" aria-label="Rishi Home Interior — Your Dream Home Designer">
          <img src={logoWordmark} alt="Rishi Home Interior — Your Dream Home Designer" />
        </NavLink>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.href} to={n.href} end={n.href === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-cta">
          <NavLink className="btn btn-outline-light btn-sm" to="/contact">
            Book Consultation
          </NavLink>
          <button
            className="burger"
            id="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
