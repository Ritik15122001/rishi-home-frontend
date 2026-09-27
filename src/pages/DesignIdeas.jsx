import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Picture from "../components/Picture";
import DesignCard from "../components/DesignCard";
import CatTile from "../components/CatTile";
import CtaBand from "../components/CtaBand";
import useReveal from "../hooks/useReveal";
import { fetchCategories, fetchDesigns } from "../lib/api";
import { STYLES } from "../lib/content";
import { SearchIcon, Arrow } from "../lib/icons";

const PAGE_SIZE = 12;
const PAGE_STEP = 6;

export default function DesignIdeas() {
  const rootRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [allDesigns, setAllDesigns] = useState([]);
  const [strips, setStrips] = useState({ trending: [], recent: [], picks: [] });
  const [loaded, setLoaded] = useState(false);
  const [shown, setShown] = useState(PAGE_SIZE);

  const catSlug = searchParams.get("c") || "";
  const style = STYLES.includes(searchParams.get("s")) ? searchParams.get("s") : "All";
  const q = searchParams.get("q") || "";

  const catName = useMemo(() => {
    if (!catSlug) return "All";
    const found = categories.find((c) => c.slug === catSlug);
    return found ? found.name : "All";
  }, [catSlug, categories]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    let alive = true;
    fetchDesigns({ limit: 200 }).then((res) => {
      if (!alive) return;
      setAllDesigns(res.designs);
      setLoaded(true);
    });
    Promise.all([
      fetchDesigns({ trending: true, limit: 8 }),
      fetchDesigns({ sort: "recent", limit: 8 }),
      fetchDesigns({ editorsPick: true, limit: 8 })
    ]).then(([t, r, p]) => {
      if (!alive) return;
      setStrips({ trending: t.designs, recent: r.designs, picks: p.designs });
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [catSlug, style, q]);

  const filtered = useMemo(() => {
    return allDesigns.filter((d) => {
      if (catName !== "All" && d.category !== catName) return false;
      if (style !== "All" && d.style !== style) return false;
      const term = q.trim().toLowerCase();
      if (!term) return true;
      const hay = [d.title, d.category, d.style, d.palette, d.desc, d.materials.join(" "), d.colors.map((c) => c.name).join(" ")]
        .join(" ")
        .toLowerCase();
      return term.split(/\s+/).every((t) => hay.indexOf(t) > -1);
    });
  }, [allDesigns, catName, style, q]);

  const visible = filtered.slice(0, shown);

  useReveal(rootRef, [loaded, visible.length, catSlug, style, q, strips]);

  function setParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "All") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: false });
  }

  function clearFilters() {
    setSearchParams({});
  }

  const catFilters = ["All", ...categories.map((c) => c.name)];

  return (
    <div ref={rootRef} data-nav="dark">
      <section className="phero">
        <Picture id="photo-1600210492493-0946911123ea" alt="Timber ceiling living room interior" w={2000} h={1125} eager sizes="100vw" ws={[900, 1400, 2000]} />
        <div className="phero-in">
          <span className="label on-dark rv">Design ideas</span>
          <h1 className="d1 rv" data-d="1">
            Find your interior <em>inspiration.</em>
          </h1>
          <p className="lede rv" data-d="2">
            Explore curated spaces, materials, colours and ideas for every corner of your home
            {allDesigns.length ? ` — ${allDesigns.length} designs across ${categories.length} room types.` : "."}
          </p>
        </div>
      </section>

      <div className="filters" id="filters">
        <div className="wrap">
          <div className="filters-in">
            <div className="frow">
              <span className="flabel">Search</span>
              <div className="search">
                <label className="sr" htmlFor="designSearch">
                  Search interior ideas
                </label>
                <input
                  id="designSearch"
                  type="search"
                  placeholder="Search interior ideas…"
                  defaultValue={q}
                  autoComplete="off"
                  onChange={(e) => {
                    const val = e.target.value;
                    clearTimeout(window.__ideasSearchTimer);
                    window.__ideasSearchTimer = setTimeout(() => setParam("q", val), 200);
                  }}
                />
                <SearchIcon />
              </div>
            </div>
            <ChipRow label="Room" items={catFilters} active={catName} onSelect={(name) => {
              if (name === "All") setParam("c", "");
              else {
                const found = categories.find((c) => c.name === name);
                setParam("c", found ? found.slug : "");
              }
            }} />
            <ChipRow label="Style" items={["All", ...STYLES]} active={style} onSelect={(s) => setParam("s", s)} />
          </div>
        </div>
      </div>

      <section className="sec" id="results">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 18, flexWrap: "wrap", marginBottom: "clamp(26px,3vw,44px)" }}>
            <h2 className="d4" style={{ fontFamily: "var(--serif)" }}>
              {catName === "All" ? "All designs" : catName}
              {style !== "All" ? ` · ${style}` : ""}
            </h2>
            <span className="result-count">
              {filtered.length} design{filtered.length === 1 ? "" : "s"}
              {q ? ` for "${q}"` : ""}
            </span>
          </div>

          {filtered.length === 0 && loaded ? (
            <div className="empty">
              <span className="label">No matches</span>
              <h3 className="d3">
                Nothing here <em>yet.</em>
              </h3>
              <p className="lede" style={{ textAlign: "center" }}>
                Try a different room, style or keyword — or clear the filters to see all {allDesigns.length} designs.
              </p>
              <button className="btn btn-ghost" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="dgrid" id="dgrid">
                {visible.map((d, i) => (
                  <DesignCard key={d.slug} design={d} index={i} />
                ))}
              </div>
              {filtered.length > shown ? (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(36px,4vw,64px)" }}>
                  <button className="btn btn-ghost" onClick={() => setShown((s) => s + PAGE_STEP)}>
                    Load more &middot; {filtered.length - shown} remaining
                  </button>
                </div>
              ) : (
                <p className="result-count" style={{ textAlign: "center", marginTop: "clamp(32px,4vw,56px)" }}>
                  Showing all {filtered.length} design{filtered.length === 1 ? "" : "s"}
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <div className="surface" style={{ paddingBlock: "clamp(40px,5vw,80px)" }}>
        <Strip title="Trending now" label="Most viewed this month" items={strips.trending} />
        <Strip title="Recently added" label="New to the studio" items={strips.recent} />
        <Strip title="Editor&rsquo;s picks" label="Chosen by our design team" items={strips.picks} />
      </div>

      <CtaBand />
    </div>
  );
}

function ChipRow({ label, items, active, onSelect }) {
  return (
    <div className="frow">
      <span className="flabel">{label}</span>
      <div className="chips" role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
        {items.map((it) => (
          <button key={it} className="chip" aria-pressed={it === active} onClick={() => onSelect(it)}>
            {it}
          </button>
        ))}
      </div>
    </div>
  );
}

function Strip({ title, label, items }) {
  if (!items || !items.length) return null;
  return (
    <section className="sec-sm">
      <div className="wrap">
        <div className="shead-row rv" style={{ marginBottom: 28, alignItems: "center" }}>
          <div>
            <span className="label">{label}</span>
            <h2 className="d3" style={{ marginTop: 12 }} dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          <Link className="ulink" to="/design-ideas">
            All designs <Arrow />
          </Link>
        </div>
        <div className="rail">
          {items.map((d, i) => (
            <CatTile
              key={d.slug}
              imgId={d.img}
              alt={`${d.title} — ${d.category}`}
              note={d.category}
              name={d.title}
              href={`/design/${d.slug}`}
              index={i}
              sizes="(max-width:560px) 72vw, 24vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
