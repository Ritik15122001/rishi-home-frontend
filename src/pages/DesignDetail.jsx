import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Picture from "../components/Picture";
import DesignCard from "../components/DesignCard";
import SectionHead from "../components/SectionHead";
import useReveal from "../hooks/useReveal";
import { useUiStore } from "../store/uiStore";
import { fetchDesign } from "../lib/api";
import { img } from "../lib/images";
import { Arrow } from "../lib/icons";
import NotFound from "./NotFound";

export default function DesignDetail() {
  const { slug } = useParams();
  const rootRef = useRef(null);
  const openLightbox = useUiStore((s) => s.openLightbox);

  const [design, setDesign] = useState(null);
  const [related, setRelated] = useState([]);
  const [galIndex, setGalIndex] = useState(0);
  const [litHex, setLitHex] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    setDesign(null);
    setNotFound(false);
    setGalIndex(0);
    setLitHex(null);
    setLoaded(false);
    fetchDesign(slug)
      .then((data) => {
        if (!alive) return;
        setDesign(data.design);
        setRelated(data.related);
        setLoaded(true);
      })
      .catch(() => {
        if (alive) {
          setNotFound(true);
          setLoaded(true);
        }
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  useReveal(rootRef, [loaded, design && design.slug]);

  if (notFound) return <NotFound />;
  if (!design) return <div style={{ minHeight: "60vh" }} />;

  const gallerySet = design.gallery.map((g, i) => ({ id: g, cap: `${design.title} — view ${i + 1}` }));

  return (
    <div ref={rootRef}>
      <section style={{ paddingTop: "calc(var(--nav-h) + clamp(30px,4vw,60px))" }}>
        <div className="wrap">
          <nav className="crumb rv" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/design-ideas">Design Ideas</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/design-ideas?c=${design.category.toLowerCase().replace(/\s+/g, "-")}`}>{design.category}</Link>
          </nav>
          <div className="detail-head" style={{ marginTop: "clamp(24px,3vw,44px)" }}>
            <div className="h">
              <span className="label rv">
                {design.category} &middot; {design.style}
              </span>
              <h1 className="d2 rv" data-d="1" style={{ marginTop: 14 }}>
                {design.title}
              </h1>
            </div>
            <div className="m rv" data-d="2">
              <p className="lede" style={{ maxWidth: "38ch" }}>
                {design.palette} &mdash; {design.materials.slice(0, 3).join(", ").toLowerCase()}.
              </p>
              <Link className="ulink" to="/contact">
                Enquire about this look <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm">
        <div className="wrap">
          <div className="gal-main rvi" role="button" tabIndex={0} aria-label="Open gallery viewer" onClick={() => openLightbox(gallerySet, galIndex)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openLightbox(gallerySet, galIndex)}>
            <img src={img(design.gallery[galIndex], 1600)} alt={`${design.title} — view ${galIndex + 1}`} />
          </div>
          <div className="thumbs" role="tablist" aria-label="Gallery thumbnails">
            {design.gallery.map((g, i) => (
              <button key={i} className="thumb" role="tab" aria-current={i === galIndex} aria-label={`View image ${i + 1} of ${design.gallery.length}`} onClick={() => setGalIndex(i)}>
                <Picture id={g} alt={`${design.title} — view ${i + 1}`} w={400} h={300} sizes="22vw" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="split">
            <div className="split-txt">
              <span className="label rv">About this space</span>
              <h2 className="d3 rv" data-d="1">
                {design.palette}
              </h2>
              <p className="lede rv" data-d="2">
                {design.desc}
              </p>
              <div className="specs rv" data-d="3" style={{ marginTop: 10 }}>
                <div className="spec">
                  <span className="label">Style</span>
                  <b>{design.style}</b>
                </div>
                <div className="spec">
                  <span className="label">Room</span>
                  <b>{design.category}</b>
                </div>
                <div className="spec">
                  <span className="label">Palette</span>
                  <b>{design.palette}</b>
                </div>
                <div className="spec">
                  <span className="label">Materials</span>
                  <b style={{ fontSize: "1rem", fontFamily: "var(--sans)", fontWeight: 300, lineHeight: 1.55 }}>{design.materials.join(" · ")}</b>
                </div>
              </div>
            </div>
            <div className="split-img">
              <div className="palette rv" data-d="2">
                <span className="label">Colour palette</span>
                <div className={"palette-stage" + (litHex ? " lit" : "")}>
                  <Picture id={design.gallery[1] || design.img} alt={`${design.title} — palette reference`} w={1000} h={667} sizes="(max-width:1080px) 92vw, 42vw" />
                  <span className="palette-wash" aria-hidden="true" style={{ background: litHex || "transparent" }}></span>
                </div>
                <div className="swatches">
                  {design.colors.map((c) => (
                    <button
                      key={c.name}
                      className={"sw" + (litHex === c.hex ? " on" : "")}
                      aria-label={`Preview ${c.name}`}
                      onMouseEnter={() => setLitHex(c.hex)}
                      onFocus={() => setLitHex(c.hex)}
                      onClick={() => setLitHex((cur) => (cur === c.hex ? null : c.hex))}
                    >
                      <i style={{ background: c.hex }}></i>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
                <p className="small">Hover or tap a colour to see how it tints the space.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec surface">
        <div className="wrap">
          <SectionHead ix="Related" label="Keep exploring" title="You may also <em>like.</em>" />
          <div className="dgrid">
            {related.map((d, i) => (
              <DesignCard key={d.slug} design={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark" data-nav="dark">
        <div className="wrap">
          <div style={{ display: "grid", gap: 26, justifyItems: "start", maxWidth: 640 }}>
            <span className="label on-dark rv">Love this look?</span>
            <h2 className="d2 rv" data-d="1" style={{ color: "#F7F4EE" }}>
              Let&rsquo;s adapt it to
              <br />
              your <em>rooms.</em>
            </h2>
            <p className="lede on-dark rv" data-d="2">
              Share your floor plan and we&rsquo;ll show you how this palette and joinery translate to your home&rsquo;s dimensions.
            </p>
            <div className="cta-actions rv" data-d="3">
              <Link className="btn btn-light" to="/contact">
                Book a consultation <Arrow />
              </Link>
              <Link className="btn btn-outline-light" to="/design-ideas">
                Back to design ideas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
