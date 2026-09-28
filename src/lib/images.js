const IMG_BASE = "https://images.unsplash.com/";

// Accepts either a bare Unsplash photo id ("photo-xxxx") or a full image URL
// (so the admin can paste a direct URL for a custom/uploaded photo later).
export function img(id, w = 1200, q = 72, h) {
  if (!id) return "";
  const base = /^https?:\/\//.test(id) ? id.split("?")[0] : IMG_BASE + id;
  return `${base}?auto=format&fit=crop&w=${w}&q=${q}${h ? `&h=${h}` : ""}`;
}

export function srcset(id, ws = [640, 1000, 1500]) {
  return ws.map((w) => `${img(id, w)} ${w}w`).join(", ");
}
