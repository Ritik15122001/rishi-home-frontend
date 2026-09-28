import { Link } from "react-router-dom";
import { BRAND, NAV } from "../lib/content";
import { SOCIAL_ICONS } from "../lib/icons";
import logo from "../assets/logo.png";

const IDEA_LINKS = [
  { name: "Kitchen", slug: "kitchen" },
  { name: "Living Room", slug: "living-room" },
  { name: "Master Bedroom", slug: "bedroom" },
  { name: "Bathroom", slug: "bathroom" },
  { name: "Wardrobe", slug: "wardrobe" },
  { name: "Dining Room", slug: "dining" }
];

export default function Footer() {
  return (
    <footer className="foot" id="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img className="foot-logo" src={logo} alt="Rishi Home Interior — Your Dream Home Designer" />
            <p>{BRAND.tagline}</p>
            <div className="socials">
              {Object.keys(SOCIAL_ICONS).map((k) => (
                <a key={k} href={BRAND.social[k]} target="_blank" rel="noopener noreferrer" aria-label={k}>
                  {SOCIAL_ICONS[k]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link to={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Design ideas</h4>
            <ul>
              {IDEA_LINKS.map((c) => (
                <li key={c.slug}>
                  <Link to={`/design-ideas?c=${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={BRAND.phoneHref}>{BRAND.phone}</a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
              <li>
                <Link to="/contact">{BRAND.address}</Link>
              </li>
              <li>
                <Link to="/contact">{BRAND.hours}</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="credit">
          Photography shown is licensed stock imagery used as design reference and does not depict completed Rishi
          Home Interior projects. Replace the image ids in the catalogue with your own project photographs before
          going live.
        </p>
        <div className="foot-bot">
          <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span className="foot-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
