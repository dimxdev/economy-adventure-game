# Economy Adventure

Game edukasi web untuk siswa SD kelas 5 — konsep kegiatan ekonomi (produksi, distribusi, konsumsi).
Lihat `docs/` untuk spesifikasi lengkap: [project.md](docs/project.md) · [design.md](docs/design.md) · [task.md](docs/task.md).

## Menjalankan (pakai Bun)

```bash
bun install
bun run dev      # server dev
bun run build    # output ke dist/
bun run preview  # preview hasil build
```

## Tech stack

- **Phaser 3** — game core (scene, drag-drop, scale manager)
- **Svelte 5** — UI overlay (menu, HUD, modal, overlay orientasi)
- **Dexie** (IndexedDB) — progress & assessment lokal per-browser, tanpa login
- **Vite** — build tool
- **Vercel** — hosting static (auto-deteksi `bun.lockb`)

## Struktur

```
public/assets/<kategori>/   aset game (karakter, ui, bg, level1..4, audio)
src/game/                   Phaser: config, eventBridge, scenes/, objects/
src/components/              komponen UI Svelte
src/services/               db.js (Dexie), progress.js
src/data/                   konten per-level (dipisah dari logika)
src/styles/tokens.css       design tokens (warna/tipografi dari design.md)
```

Komunikasi Phaser ↔ UI lewat `src/game/eventBridge.js` (event emitter).

## Progress

Dikerjakan per fase mengikuti [docs/task.md](docs/task.md). Saat ini: **FASE 0 selesai**.
