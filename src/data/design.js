/**
 * Mirror token desain untuk dipakai di JS (scene Phaser & payload event).
 * Sumber kebenaran tetap DESIGN.md §3 + src/styles/tokens.css.
 * Phaser butuh angka hex (0x...), Svelte pakai string CSS var.
 */
export const WARNA = {
  primary: 0x5cb85c,
  secondary: 0x4fa9e0,
  accent: 0xf5a623,
  surface: 0xfbf6ec,
  ink: 0x4a3b2a,
  warning: 0xe4685a,
  white: 0xffffff,
  muted: 0xd8d2c6,
};

/** Warna per kategori — WAJIB konsisten di semua level (DESIGN.md §3). */
export const KATEGORI = {
  produksi: { hex: 0x5cb85c, css: 'var(--c-kategori-produksi)', label: 'Produksi', ikon: '🏭' },
  distribusi: { hex: 0xf5a623, css: 'var(--c-kategori-distribusi)', label: 'Distribusi', ikon: '🚚' },
  konsumsi: { hex: 0x4fa9e0, css: 'var(--c-kategori-konsumsi)', label: 'Konsumsi', ikon: '🛒' },
};

export const DESIGN = { WARNA, KATEGORI };
export default DESIGN;
