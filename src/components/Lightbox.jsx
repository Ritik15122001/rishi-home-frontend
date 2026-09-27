import { useEffect, useRef } from "react";
import { useUiStore } from "../store/uiStore";
import { img } from "../lib/images";
import { CloseIcon, ChevLeft, ArrowLg } from "../lib/icons";

const REDUCED = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Lightbox() {
  const lightbox = useUiStore((s) => s.lightbox);
  const closeLightbox = useUiStore((s) => s.closeLightbox);
  const lightboxGo = useUiStore((s) => s.lightboxGo);
  const closeBtnRef = useRef(null);

  const { open, set, index } = lightbox;
  const item = set[index];

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      closeBtnRef.current && closeBtnRef.current.focus();
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") lightboxGo(1);
      else if (e.key === "ArrowLeft") lightboxGo(-1);
      else if (e.key === "Tab") {
        e.preventDefault();
        closeBtnRef.current && closeBtnRef.current.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeLightbox, lightboxGo]);

  if (!open || !item) return null;
  const single = set.length < 2;

  return (
    <div className={"lb" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(e) => e.target.classList.contains("lb") && closeLightbox()}>
      <button ref={closeBtnRef} className="lb-btn lb-close" aria-label="Close viewer" onClick={closeLightbox}>
        <CloseIcon />
      </button>
      {!single && (
        <button className="lb-btn lb-prev" aria-label="Previous image" onClick={() => lightboxGo(-1)}>
          <ChevLeft />
        </button>
      )}
      {!single && (
        <button className="lb-btn lb-next" aria-label="Next image" onClick={() => lightboxGo(1)}>
          <ArrowLg />
        </button>
      )}
      <figure>
        <img src={img(item.id, 1800, 78)} alt={item.cap || ""} />
        <figcaption>{item.cap || ""}</figcaption>
      </figure>
      <div className="lb-count">
        {index + 1} / {set.length}
      </div>
    </div>
  );
}
