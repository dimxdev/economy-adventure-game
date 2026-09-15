import { ASSETS, ASSET_BASE } from '../../data/assets.js';

/**
 * Sistem placeholder aset.
 *  - queueAssets()             : antre semua gambar di manifest ke loader Phaser
 *  - buildMissingPlaceholders(): untuk aset yang tidak berhasil ter-load (file
 *                                belum ada), bikin tekstur placeholder (canvas)
 *                                dengan key sama.
 *
 * Deteksi "belum ada" dilakukan dengan mengecek kondisi tekstur setelah load
 * selesai (tidak ada / menunjuk ke __MISSING) — tidak bergantung pada event
 * loaderror, karena dev server Vite kadang membalas 200 + index.html untuk path
 * aset yang hilang (SPA fallback) sehingga loaderror tak terpicu.
 *
 * Begitu file asli tersedia di public/assets/, loader berhasil dan placeholder
 * tidak dibuat — tanpa ubah kode scene.
 */

export function queueAssets(scene) {
  for (const img of ASSETS.images) {
    scene.load.image(img.key, ASSET_BASE + img.path);
  }
}

function teksturValid(scene, key) {
  if (!scene.textures.exists(key)) return false;
  const tex = scene.textures.get(key);
  return tex && tex.key !== '__MISSING' && tex.key !== '__DEFAULT';
}

/** @returns {string[]} key yang dibuatkan placeholder */
export function buildMissingPlaceholders(scene) {
  const dibuat = [];
  for (const img of ASSETS.images) {
    if (!teksturValid(scene, img.key)) {
      makePlaceholder(scene, img);
      dibuat.push(img.key);
    }
  }
  return dibuat;
}

// --- Warna (string CSS, dipakai di 2D canvas) --------------------------------
const INK = '#4A3B2A';
const SURFACE = '#FBF6EC';
const PALETTE = ['#5CB85C', '#4FA9E0', '#F5A623', '#E4685A'];

function colorFor(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function roundRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** Bikin tekstur placeholder via CanvasTexture (andal, tidak lewat framebuffer). */
function makePlaceholder(scene, { key, w, h, kind, label }) {
  const isBg = kind === 'bg';
  const radius = isBg ? 0 : 24;

  if (scene.textures.exists(key)) scene.textures.remove(key);

  const tex = scene.textures.createCanvas(key, w, h);
  if (!tex) return;
  const ctx = tex.getContext();

  ctx.fillStyle = isBg ? SURFACE : colorFor(key);
  roundRectPath(ctx, 1, 1, w - 2, h - 2, radius);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = isBg ? 'rgba(74,59,42,0.2)' : INK;
  roundRectPath(ctx, 2, 2, w - 4, h - 4, radius);
  ctx.stroke();

  const fontSize = Math.round(Math.max(18, Math.min(w, h) / 7));
  ctx.fillStyle = isBg ? INK : '#FFFFFF';
  ctx.font = `700 ${fontSize}px Nunito, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const words = String(label ?? key).split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > w - 40 && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);

  const lh = fontSize * 1.25;
  const startY = h / 2 - ((lines.length - 1) * lh) / 2;
  lines.forEach((l, i) => ctx.fillText(l, w / 2, startY + i * lh));

  tex.refresh();
}
