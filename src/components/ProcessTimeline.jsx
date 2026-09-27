export default function ProcessTimeline({ steps }) {
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div className="step rv" data-d={i % 4} key={s.n}>
          <span className="step-n">{s.n}</span>
          <h3>{s.t}</h3>
          <p className="small">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
