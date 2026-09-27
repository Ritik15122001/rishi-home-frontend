import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Picture from "../components/Picture";
import DesignCard from "../components/DesignCard";
import CatTile from "../components/CatTile";
import SectionHead from "../components/SectionHead";
import CtaBand from "../components/CtaBand";
import BookButton from "../components/BookButton";
import ProcessTimeline from "../components/ProcessTimeline";
import useReveal from "../hooks/useReveal";
import { useUiStore } from "../store/uiStore";
import { fetchCategories, fetchDesigns, fetchCollections } from "../lib/api";
import { SHOWCASE, PROCESS, WHYS } from "../lib/content";
import { Arrow, ZoomIcon } from "../lib/icons";

const COLLECTION_LAYOUT = [
  { cls: "col-a", ar: "ar-3-4", w: 900, h: 1200, sizes: "(max-width:560px) 92vw, 40vw" },
  { cls: "col-b", ar: "ar-1-1", w: 800, h: 800, sizes: "(max-width:560px) 92vw, 32vw" },
  { cls: "col-c", ar: "ar-5-7", w: 700, h: 980, sizes: "(max-width:560px) 92vw, 24vw" }
];

export default function Home() {
  const rootRef = useRef(null);
  const openLightbox = useUiStore((s) => s.openLightbox);

  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetchCategories(),
      fetchDesigns({ featured: true, limit: 1 }),
      fetchDesigns({ limit: 1 }),
      fetchCollections()
    ]).then(([cats, featuredRes, anyRes, cols]) => {
      if (!alive) return;
      setCategories(cats.slice(0, 6));
      setFeatured((featuredRes.designs && featuredRes.designs[0]) || (anyRes.designs && anyRes.designs[0]) || null);
      setCollections(cols);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useReveal(rootRef, [loaded]);

  const showcaseSet = SHOWCASE.map((s) => ({ id: s.img, cap: s.cap }));

  return (
    <div ref={rootRef} data-nav="dark">
      {/* ---------- HERO ---------- */}
      <section className="hero" data-journey="Inspire">
        <div className="hero-media">
          <Picture id="photo-1615873968403-89e068629265" alt="Warm contemporary living room with teal accent wall designed by Rishi Home Interior" w={2000} h={1125} eager sizes="100vw" ws={[900, 1400, 2000]} />
        </div>
        <div className="hero-in">
          <div className="hero-grid">
            <div>
              <span className="label on-dark rv">Rishi Home Interior</span>
              <h1 className="d1 rv" data-d="1">
                Spaces that feel
                <br />
                like <em>home.</em>
              </h1>
              <p className="lede rv" data-d="2">
                Thoughtfully designed interiors that balance beauty, functionality and the way you live.
              </p>
              <div className="hero-actions rv" data-d="3">
                <Link className="btn btn-light" to="/design-ideas">
                  Explore designs <Arrow />
                </Link>
                <Link className="btn btn-outline-light" to="/contact">
                  Book a consultation
                </Link>
              </div>
            </div>
            <div className="hero-side rv" data-d="3">
              <div className="hero-meta">
                <div>
                  <span>Based in</span>
                  <b>Delhi NCR</b>
                </div>
                <div>
                  <span>Spaces designed</span>
                  <b>100+</b>
                </div>
                <div>
                  <span>Studio since</span>
                  <b>2018</b>
                </div>
              </div>
              <a className="scroll-cue" href="#approach">
                Scroll to explore <i></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- APPROACH ---------- */}
      <section className="sec" id="approach" data-journey="Inspire">
        <div className="wrap">
          <div className="split">
            <div className="split-txt">
              <span className="label rv">Our approach</span>
              <h2 className="d2 rv" data-d="1">
                Designed around
                <br />
                your <em>everyday.</em>
              </h2>
              <p className="lede rv" data-d="2">
                Every home has its own rhythm. We create interiors that bring together thoughtful planning, refined
                aesthetics and practical living — so the space works on an ordinary Tuesday, not only in a
                photograph.
              </p>
              <div className="rv" data-d="3" style={{ display: "flex", gap: 28, flexWrap: "wrap", paddingTop: 8 }}>
                <div style={{ flex: 1, minWidth: 150 }}>
                  <span className="num" style={{ color: "var(--accent)", fontSize: "2.1rem" }}>
                    01
                  </span>
                  <p className="small" style={{ marginTop: 8 }}>
                    We plan storage before we plan styling.
                  </p>
                </div>
                <div style={{ flex: 1, minWidth: 150 }}>
                  <span className="num" style={{ color: "var(--accent)", fontSize: "2.1rem" }}>
                    02
                  </span>
                  <p className="small" style={{ marginTop: 8 }}>
                    We specify in writing, by brand and grade.
                  </p>
                </div>
              </div>
              <div className="rv" data-d="4" style={{ paddingTop: 10 }}>
                <Link className="ulink" to="/about">
                  More about the studio <Arrow />
                </Link>
              </div>
            </div>
            <div className="split-img stack-imgs">
              <div className="frame ar-4-5 rvi">
                <Picture id="photo-1618221195710-dd6b41faaea6" alt="Warm minimal living room with leather ottomans" w={1000} h={1250} sizes="(max-width:1080px) 92vw, 42vw" />
              </div>
              <div className="frame ar-1-1 b rvi">
                <Picture id="photo-1616628188540-925618b98318" alt="Material and finish samples laid out in the studio" w={600} h={600} sizes="20vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section className="sec surface" data-journey="Explore">
        <div className="wrap">
          <SectionHead
            ix="01 — Explore"
            label="Rooms we design"
            title="Explore your <em>space.</em>"
            aside={
              <p className="lede">
                Twelve room types, each planned from its own set of constraints — light, storage, circulation and the
                way the room is actually used.
              </p>
            }
          />
        </div>
        <div className="wrap">
          <div className="rail">
            {categories.map((c, i) => (
              <CatTile key={c.slug} imgId={c.image} alt={`${c.name} interior design`} note={c.note} name={c.name} href={`/design-ideas?c=${c.slug}`} index={i} />
            ))}
          </div>
        </div>
        <div className="wrap" style={{ marginTop: "clamp(28px,3vw,50px)" }}>
          <div className="rv">
            <Link className="btn btn-ghost" to="/design-ideas">
              View all spaces <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED ---------- */}
      {featured && (
        <section className="sec" data-journey="Discover">
          <div className="wrap">
            <Link className="feature rvi zoom" to={`/design/${featured.slug}`} aria-label={`Design of the week: ${featured.title}`} style={{ display: "block" }}>
              <Picture id={featured.img} alt={`${featured.title} interior`} w={1800} h={1000} sizes="100vw" ws={[900, 1400, 1800]} />
              <span className="feature-tag">
                <i></i> Design of the week
              </span>
              <span className="feature-in">
                <span className="feature-card">
                  <span className="label on-dark">
                    {featured.category} &middot; {featured.style}
                  </span>
                  <span className="d2" style={{ fontFamily: "var(--serif)", display: "block", color: "#F7F4EE", lineHeight: 1.02 }}>
                    {featured.palette}
                  </span>
                  <span className="lede on-dark" style={{ display: "block" }}>
                    {featured.desc}
                  </span>
                  <span className="ulink" style={{ color: "var(--gold)" }}>
                    View design <Arrow />
                  </span>
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ---------- COLLECTIONS ---------- */}
      <section className="sec" data-journey="Discover">
        <div className="wrap">
          <SectionHead ix="02 — Discover" label="Design collections" title="Three ways to<br>read a <em>home.</em>" />
          <div className="cols">
            {collections.map((col, i) => {
              const cfg = COLLECTION_LAYOUT[i] || COLLECTION_LAYOUT[0];
              return (
                <article className={`col-item ${cfg.cls} rv`} data-d={i} key={col.key}>
                  <div className={`frame ${cfg.ar} zoom`}>
                    <Picture id={col.img} alt={`${col.label} interior collection`} w={cfg.w} h={cfg.h} sizes={cfg.sizes} />
                  </div>
                  <h3>
                    <Link className="card-link" to={`/design-ideas?s=${col.style}`}>
                      {col.label}
                    </Link>
                  </h3>
                  <p className="small">{col.text}</p>
                  <div className="tags">
                    {col.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <span className="card-go">
                      View collection <Arrow />
                    </span>
                    <BookButton label={col.label} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section className="sec surface" data-journey="Visualize">
        <div className="wrap">
          <SectionHead
            ix="03 — Visualize"
            label="How we work"
            title="From idea<br>to <em>home.</em>"
            aside={<p className="lede">Four stages, each with a written output — so you always know what has been decided and what comes next.</p>}
          />
          <ProcessTimeline steps={PROCESS} />
        </div>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="sec dark" data-journey="Consult" data-nav="dark">
        <div className="wrap">
          <SectionHead ix="04 — Consult" label="Why us" title="Why choose<br>Rishi Home <em>Interior?</em>" />
          <div className="whys">
            {WHYS.map((w, i) => (
              <div className="why rv" data-d={i % 4} key={w.n}>
                <span className="num">{w.n}</span>
                <h3>{w.t}</h3>
                <p className="small">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SHOWCASE ---------- */}
      <section className="sec" data-journey="Create">
        <div className="wrap">
          <SectionHead
            ix="05 — Create"
            label="Project showcase"
            title="Selected <em>spaces.</em>"
            aside={<p className="lede">A cross-section of recent rooms. Select any image to view it larger — use the arrow keys to move through the set.</p>}
          />
          <div className="masonry" id="showcase">
            {SHOWCASE.map((s, i) => (
              <button key={s.cap} className="rv" data-d={i % 3} aria-label={`View ${s.cap} larger`} onClick={() => openLightbox(showcaseSet, i)}>
                <span className="frame" style={{ display: "block" }}>
                  <Picture id={s.img} alt={s.cap} w={900} h={1100} sizes="(max-width:560px) 46vw, 31vw" />
                </span>
                <span className="mz" aria-hidden="true">
                  <span>
                    <ZoomIcon />
                  </span>
                </span>
                <span className="mcap">{s.cap}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
