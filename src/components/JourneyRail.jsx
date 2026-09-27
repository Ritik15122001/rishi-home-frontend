import { JOURNEY } from "../lib/content";

export default function JourneyRail({ show, current, dark }) {
  return (
    <div className={"journey" + (show ? " show" : "") + (dark ? " on-dark" : "")} aria-hidden="true">
      {JOURNEY.map((j) => (
        <b key={j} data-j={j} className={j === current ? "on" : ""}>
          {j}
        </b>
      ))}
    </div>
  );
}
