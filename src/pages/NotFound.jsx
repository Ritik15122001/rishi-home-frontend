import { useRef } from "react";
import { Link } from "react-router-dom";
import Picture from "../components/Picture";
import useReveal from "../hooks/useReveal";

export default function NotFound() {
  const rootRef = useRef(null);
  useReveal(rootRef, []);

  return (
    <div ref={rootRef} data-nav="dark">
      <section className="phero" style={{ minHeight: "100svh" }}>
        <Picture id="photo-1586023492125-27b2c045efd7" alt="Olive reading corner interior" w={1600} h={1400} eager sizes="100vw" />
        <div className="phero-in">
          <span className="label on-dark rv">Error 404</span>
          <h1 className="d1 rv" data-d="1">
            This room doesn&rsquo;t
            <br />
            <em>exist.</em>
          </h1>
          <p className="lede rv" data-d="2">
            The page you were looking for has moved or never existed. Everything else is still where you left it.
          </p>
          <div className="cta-actions rv" data-d="3" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-light" to="/">
              Back to home
            </Link>
            <Link className="btn btn-outline-light" to="/design-ideas">
              Browse design ideas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
