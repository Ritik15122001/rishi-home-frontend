import { useRef } from "react";
import Picture from "../components/Picture";
import SectionHead from "../components/SectionHead";
import CtaBand from "../components/CtaBand";
import FaqBlock from "../components/FaqBlock";
import useReveal from "../hooks/useReveal";
import { STATS, VALUES, PHILOSOPHY } from "../lib/content";

export default function About() {
  const rootRef = useRef(null);
  useReveal(rootRef, []);

  return (
    <div ref={rootRef} data-nav="dark">
      <section className="phero">
        <Picture id="photo-1566665797739-1674de7a421a" alt="Fluted walnut master bedroom interior" w={2000} h={1125} eager sizes="100vw" ws={[900, 1400, 2000]} />
        <div className="phero-in">
          <span className="label on-dark rv">About the studio</span>
          <h1 className="d1 rv" data-d="1">
            Interiors with <em>intention.</em>
          </h1>
          <p className="lede rv" data-d="2">
            A small Delhi studio designing and building homes across the NCR since 2018.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div className="split-txt">
              <span className="label rv">Our story</span>
              <h2 className="d2 rv" data-d="1">
                Built from one
                <br />
                simple <em>question.</em>
              </h2>
              <p className="lede rv" data-d="2">
                Rishi Home Interior began in 2018 with a question we kept asking on site: why do so many finished
                homes look complete but work badly? Doors that clash, sockets behind sofas, wardrobes sized for a
                catalogue rather than a wardrobe.
              </p>
              <p className="lede rv" data-d="3">
                So we built the studio around planning first. We measure, we ask what you own, we look at where the
                light falls through the day — and only then do we draw. It makes the design stage slower and
                everything after it faster.
              </p>
            </div>
            <div className="split-img stack-imgs">
              <div className="frame ar-4-5 rvi">
                <Picture id="photo-1615529182904-14819c35db37" alt="Sage green contemporary living room" w={1000} h={1250} sizes="(max-width:1080px) 92vw, 42vw" />
              </div>
              <div className="frame ar-1-1 b rvi">
                <Picture id="photo-1616628188540-925618b98318" alt="Material palette samples" w={600} h={600} sizes="20vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm surface">
        <div className="wrap">
          <div className="stats rv">
            {STATS.map((s) => (
              <div className="stat" key={s.l}>
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
          <p className="small rv" style={{ marginTop: 18, maxWidth: "60ch" }}>
            Figures reflect studio work to date and are reviewed each quarter.
          </p>
        </div>
      </section>

      <section className="sec dark" data-nav="dark">
        <div className="wrap">
          <SectionHead ix="Philosophy" label="What we believe" title="Three ideas we<br>design <em>against.</em>" />
        </div>
        <div className="wrap">
          <div className="philo">
            {PHILOSOPHY.map((p, i) => (
              <div className="philo-item rv" data-d={i} key={p.k}>
                <b>{p.k}</b>
                <p>&ldquo;{p.p}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            ix="Approach"
            label="Our approach"
            title="Planning first,<br>styling <em>last.</em>"
            aside={<p className="lede">The order of decisions is the part clients feel most. Storage, circulation and light are settled before a single finish is picked.</p>}
          />
          <div className="values">
            {VALUES.map((v, i) => (
              <div className="value rv" data-d={i % 4} key={v.t}>
                <h3>{v.t}</h3>
                <p className="small">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec surface">
        <div className="wrap">
          <SectionHead ix="FAQ" label="Good to know" title="Questions we&rsquo;re<br>asked <em>often.</em>" />
          <FaqBlock />
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
