import { img, srcset } from "../lib/images";

export default function Picture({ id, alt, w = 1200, h = 800, sizes, ws, eager = false, className, style }) {
  const sizesAttr = sizes || "(max-width:560px) 92vw, (max-width:980px) 48vw, 33vw";
  return (
    <img
      src={img(id, w)}
      srcSet={srcset(id, ws)}
      sizes={sizesAttr}
      width={w}
      height={h}
      alt={alt}
      className={className}
      style={style}
      loading={eager ? undefined : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
