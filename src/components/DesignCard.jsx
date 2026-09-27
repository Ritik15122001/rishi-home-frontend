import { Link } from "react-router-dom";
import Picture from "./Picture";
import BookButton from "./BookButton";
import { Arrow } from "../lib/icons";

export default function DesignCard({ design, index = 0 }) {
  return (
    <article className="card rv" data-d={(index % 3) + 1}>
      <div className="frame">
        <Picture id={design.img} alt={`${design.title} — ${design.category} interior design by Rishi Home Interior`} w={900} h={1125} />
        <span className="card-cat">{design.category}</span>
      </div>
      <div className="card-meta">
        <h3>
          <Link className="card-link" to={`/design/${design.slug}`}>
            {design.title}
          </Link>
        </h3>
        <span className="st">{design.style}</span>
      </div>
      <div className="card-actions">
        <span className="card-go">
          Explore <Arrow />
        </span>
        <BookButton label={design.title} />
      </div>
    </article>
  );
}
