import { useRef } from "react";
import { Link } from "react-router-dom";
import Picture from "../components/Picture";
import SectionHead from "../components/SectionHead";
import ProcessTimeline from "../components/ProcessTimeline";
import CtaBand from "../components/CtaBand";
import useReveal from "../hooks/useReveal";
import { SERVICES, SERVICE_STEPS, BRAND } from "../lib/content";
import { Arrow, Tick } from "../lib/icons";

export default function Services() {
  const rootRef = useRef(null);
  useReveal(rootRef, []);

  return (
    <div ref={rootRef} data-nav="dark">
      <section className="phero">
        <Picture id="photo-1600585152220-90363fe7e115" alt="Oak and white modular kitchen with island" w={2000} h={1125} eager sizes="100vw" ws={[900, 1400, 2000]} />
        <div className="phero-in">
          <span className="label on-dark rv">What we do</span>
          <h1 className="d1 rv" data-d="1">
            Design and <em>delivery,</em>
            <br />
            under one roof.
          </h1>
          <p className="lede rv" data-d="2">
            Seven services that cover a whole home or a single room — drawn, specified and built by the same team.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {SERVICES.map((s, i) => {
            const alt = i % 2 === 1;
            return (
              <article className={"svc" + (alt ? " alt" : "")} id={`svc-${s.n}`} key={s.n}>
                <div className="svc-img">
                  <div className={"frame " + (alt ? "ar-3-2" : "ar-4-5") + " rvi zoom"}>
                    <Picture id={s.img} alt={`${s.t} — interior design service`} w={1100} h={1000} sizes="(max-width:1080px) 92vw, 46vw" />
                  </div>
                </div>
                <div className="svc-txt">
                  <span className="num rv" style={{ color: "var(--accent)", fontSize: "clamp(1.4rem,2vw,1.9rem)" }}>
                    {s.n}
                  </span>
                  <h2 className="d3 rv" data-d="1">
                    {s.t}
                  </h2>
                  <p className="lede rv" data-d="2">
                    {s.d}
                  </p>
                  <div className="rv" data-d="3">
                    <span className="label" style={{ marginBottom: 12 }}>
                      What&rsquo;s included
                    </span>
                    <ul className="incl">
                      {s.incl.map((x) => (
                        <li key={x}>
                          <Tick />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rv svc-actions" data-d="4">
                    <Link className="btn" to="/contact" aria-label={`Book a consultation about ${s.t}`}>
                      Book Consultation <Arrow />
                    </Link>
                    <a className="ulink" href={BRAND.phoneHref}>
                      Call {BRAND.phone}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sec dark" data-nav="dark">
        <div className="wrap">
          <SectionHead ix="Process" label="Every project, the same way" title="Five stages,<br>no <em>surprises.</em>" />
          <ProcessTimeline steps={SERVICE_STEPS} />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
