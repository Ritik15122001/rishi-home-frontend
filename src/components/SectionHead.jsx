export default function SectionHead({ ix, label, title, size = "d2", aside }) {
  return (
    <div className="shead rv">
      <div className="ix">{ix}</div>
      <div className="shead-body">
        <div className="shead-row">
          <div>
            <span className="label">{label}</span>
            <h2 className={size} style={{ marginTop: 14 }} dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          {aside && <div style={{ maxWidth: "42ch" }}>{aside}</div>}
        </div>
      </div>
    </div>
  );
}
