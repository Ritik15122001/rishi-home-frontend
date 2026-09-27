import { useRef, useState } from "react";
import { FAQS } from "../lib/content";

export default function FaqBlock() {
  const [openIndex, setOpenIndex] = useState(-1);
  const panelRefs = useRef([]);

  function toggle(i) {
    setOpenIndex((cur) => (cur === i ? -1 : i));
  }

  return (
    <div className="faq">
      {FAQS.map((f, i) => {
        const open = openIndex === i;
        return (
          <div className={"faq-item" + (open ? " open" : "")} key={f.q}>
            <h3 style={{ margin: 0 }}>
              <button className="faq-q" aria-expanded={open} aria-controls={`fa${i}`} id={`fq${i}`} onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <span className="faq-ic" aria-hidden="true"></span>
              </button>
            </h3>
            <div
              className="faq-a"
              id={`fa${i}`}
              role="region"
              aria-labelledby={`fq${i}`}
              style={{ height: open ? (panelRefs.current[i] ? panelRefs.current[i].offsetHeight + "px" : "auto") : "0px" }}
            >
              <div className="faq-a-in" ref={(el) => (panelRefs.current[i] = el)}>
                <p className="small">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
