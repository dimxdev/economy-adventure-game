import { LEVEL_AKTIF, MENU_SCENE_KEY, ENDING_SCENE_KEY } from '../data/levels.js';

/**
 * Scene Registry — daftar scene Phaser + logika urutan level & resume.
 *
 * Scene infrastruktur (Boot, Preload, Menu) dan scene level didaftarkan lewat
 * `registerScenes()` saat game dibuat (FASE 3). Modul ini juga menyimpan
 * fungsi murni (tanpa Phaser) untuk menghitung "harus mulai dari mana".
 */

/** @type {Map<string, Function>} key scene -> class scene Phaser */
const registry = new Map();

/** Daftarkan satu/lebih class scene. Dipanggil sekali di config game. */
export function registerScenes(entries) {
  for (const [key, sceneClass] of Object.entries(entries)) {
    registry.set(key, sceneClass);
  }
}

/** Array class scene untuk diberikan ke Phaser.Game config. */
export function getSceneClasses() {
  return [...registry.values()];
}

export function hasScene(key) {
  return registry.has(key);
}

// --- Logika urutan level (murni, bisa diuji tanpa Phaser) -------------------

/** Daftar id level aktif, berurutan. */
export function daftarLevelId() {
  return LEVEL_AKTIF.map((l) => l.id);
}

export function infoLevel(levelId) {
  return LEVEL_AKTIF.find((l) => l.id === levelId) ?? null;
}

/** id level berikutnya setelah `levelId`, atau null kalau sudah level terakhir. */
export function levelBerikutnya(levelId) {
  const idx = LEVEL_AKTIF.findIndex((l) => l.id === levelId);
  if (idx === -1 || idx + 1 >= LEVEL_AKTIF.length) return null;
  return LEVEL_AKTIF[idx + 1].id;
}

/**
 * Level pertama yang BELUM selesai, berdasarkan daftar id yang sudah completed.
 * @param {string[]} completedIds
 * @returns {string|null} null berarti semua level sudah selesai
 */
export function levelPertamaBelumSelesai(completedIds) {
  const done = new Set(completedIds);
  for (const l of LEVEL_AKTIF) {
    if (!done.has(l.id)) return l.id;
  }
  return null;
}

/**
 * Tentukan tujuan awal saat game dibuka.
 *
 * Aturan (PROJECT.md §6): game selalu masuk lewat Menu. Menu menampilkan
 * tombol "Lanjutkan" kalau ada progress (minimal 1 level selesai ATAU
 * currentLevel bukan level pertama).
 *
 * @param {{ currentLevel: string, completed: string[] }} progress
 */
export function tentukanTujuanAwal(progress) {
  const { currentLevel, completed = [] } = progress;
  const lanjutTarget = levelPertamaBelumSelesai(completed);
  const adaProgress =
    completed.length > 0 || (currentLevel && currentLevel !== LEVEL_AKTIF[0]?.id);

  return {
    sceneKey: MENU_SCENE_KEY,
    adaProgress,
    // level yang dituju kalau siswa menekan "Lanjutkan"
    lanjutLevelId: lanjutTarget, // null = semua selesai -> arahkan ke ending
    lanjutSceneKey:
      lanjutTarget === null ? ENDING_SCENE_KEY : infoLevel(lanjutTarget)?.sceneKey,
  };
}
