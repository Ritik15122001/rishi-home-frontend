import { Link } from "react-router-dom";

export default function BookButton({ label, className = "" }) {
  return (
    <Link className={"btn-book" + (className ? " " + className : "")} to="/contact" aria-label={`Book a consultation about ${label}`}>
      Book Consultation
    </Link>
  );
}
