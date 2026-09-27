import { create } from "zustand";

export const useUiStore = create((set, get) => ({
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

  lightbox: { open: false, set: [], index: 0 },
  openLightbox: (imageSet, index = 0) => set({ lightbox: { open: true, set: imageSet, index } }),
  closeLightbox: () => set((s) => ({ lightbox: { ...s.lightbox, open: false } })),
  lightboxGo: (step) =>
    set((s) => {
      const len = s.lightbox.set.length;
      if (!len) return s;
      const index = (s.lightbox.index + step + len) % len;
      return { lightbox: { ...s.lightbox, index } };
    }),

  navSolid: false,
  setNavSolid: (v) => set({ navSolid: v })
}));
