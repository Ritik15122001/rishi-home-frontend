import { Link } from "react-router-dom";
import Picture from "./Picture";
import BookButton from "./BookButton";
import { Arrow } from "../lib/icons";

export default function CatTile({ imgId, alt, note, name, href, index = 0, sizes }) {
  return (
    <article className="cat rv" data-d={index % 3}>
      <div className="frame">
        <Picture id={imgId} alt={alt} w={700} h={930} sizes={sizes || "(max-width:560px) 72vw, 26vw"} />
      </div>
      <div className="cat-body">
        <div>
          <em>{note}</em>
          <h3>
            <Link className="card-link" to={href}>
              {name}
            </Link>
          </h3>
          <BookButton label={name} className="cat-book" />
        </div>
        <span className="cat-arrow" aria-hidden="true">
          <Arrow />
        </span>
      </div>
    </article>
  );
}
