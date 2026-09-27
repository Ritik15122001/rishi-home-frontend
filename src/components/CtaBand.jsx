import { Link } from "react-router-dom";
import Picture from "./Picture";
import { BRAND } from "../lib/content";
import { Arrow } from "../lib/icons";

export default function CtaBand() {
  return (
    <section className="cta-band sec">
      <Picture id="photo-1617806118233-18e1de247200" alt="Dining room interior by Rishi Home Interior" w={1600} h={900} sizes="100vw" />
      <div className="wrap">
        <div className="cta-in">
          <span className="label on-dark rv">Book a consultation</span>
          <h2 className="d2 rv" data-d="1">
            Ready to create a home
            <br />
            that feels like <em>yours?</em>
          </h2>
          <p className="lede on-dark rv" data-d="2">
            Tell us about your space. We&rsquo;ll help turn your ideas into a considered interior — starting with a
            free, no-obligation consultation.
          </p>
          <div className="cta-actions rv" data-d="3">
            <Link className="btn btn-light" to="/contact">
              Book a free consultation <Arrow />
            </Link>
            <a className="btn btn-outline-light" href={BRAND.phoneHref}>
              Call us &middot; {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
