import { db } from './db.js';
import { daftarLevelId, levelBerikutnya, levelPertamaBelumSelesai } from '../game/sceneRegistry.js';
import { LEVEL_AKTIF } from '../data/levels.js';
import { SEMUA_INDIKATOR } from '../data/indikator.js';

/**
 * services/progress.js — SATU-SATUNYA pintu ke penyimpanan progress.
 * Scene Phaser & komponen Svelte memanggil fungsi di sini, bukan query Dexie langsung.
 *
 * Semua fungsi async (Dexie async, tidak blocking game loop — PROJECT.md §8).
 */

const DEFAULT_SETTINGS = { muted: false };
const LEVEL_PERTAMA = LEVEL_AKTIF[0]?.id ?? 'level1';

// --- Settings --------------------------------------------------------------

export async function loadSettings() {
  const row = await db.meta.get('settings');
  return { ...DEFAULT_SETTINGS, ...(row?.value ?? {}) };
}

export async function saveSettings(patch) {
  const current = await loadSettings();
  const value = { ...current, ...patch };
  await db.meta.put({ key: 'settings', value });
  return value;
}

// --- Progress inti --------------------------------------------------------

/**
 * Ambil seluruh state progress dalam satu panggilan.
 * @returns {Promise<{
 *   currentLevel: string,
 *   completed: string[],
 *   selesaiSemua: boolean,
 *   settings: { muted: boolean }
 * }>}
 */
export async function loadProgress() {
  const [currentRow, statusRows, settings] = await Promise.all([
    db.meta.get('currentLevel'),
    db.levelStatus.where('completed').equals(1).toArray(),
    loadSettings(),
  ]);

  const valid = new Set(daftarLevelId());
  const completed = statusRows.map((r) => r.level).filter((id) => valid.has(id));
  const currentLevel =
    currentRow?.value && valid.has(currentRow.value)
      ? currentRow.value
      : levelPertamaBelumSelesai(completed) ?? LEVEL_PERTAMA;

  return {
    currentLevel,
    completed,
    selesaiSemua: levelPertamaBelumSelesai(completed) === null,
    settings,
  };
}

/** Set penanda "sedang di level ini" (dipanggil scene level saat create). */
export async function setCurrentLevel(levelId) {
  await db.meta.put({ key: 'currentLevel', value: levelId });
}

/**
 * Tandai satu level selesai, lalu majukan currentLevel ke level berikutnya
 * yang belum selesai (atau tetap di level terakhir kalau semua sudah beres).
 * @returns {Promise<{ nextLevel: string|null, selesaiSemua: boolean }>}
 */
export async function markLevelComplete(levelId) {
  const existing = await db.levelStatus.get(levelId);
  await db.levelStatus.put({
    level: levelId,
    completed: 1,
    completedAt: Date.now(),
    attempts: (existing?.attempts ?? 0) + 1,
  });

  const { completed } = await loadProgress();
  const lanjut = levelPertamaBelumSelesai(completed);
  const nextLevel = lanjut ?? levelBerikutnya(levelId);
  await db.meta.put({ key: 'currentLevel', value: nextLevel ?? levelId });

  return { nextLevel: lanjut, selesaiSemua: lanjut === null };
}

// --- Assessment (7 indikator pemahaman) ---------------------------------

/**
 * Catat 1 hasil interaksi siswa.
 * @param {{ level: string, indikator: string, benar: boolean, detail?: any }} p
 */
export async function recordAssessment({ level, indikator, benar, detail = null }) {
  await db.assessment.add({
    level,
    indikator,
    benar: benar ? 1 : 0,
    detail,
    at: Date.now(),
  });
}

/**
 * Rekap pemahaman per indikator — bahan untuk scene ending (FASE 9).
 * @returns {Promise<Record<string, { benar: number, total: number }>>}
 */
export async function getAssessmentSummary() {
  const rows = await db.assessment.toArray();
  const summary = Object.fromEntries(SEMUA_INDIKATOR.map((k) => [k, { benar: 0, total: 0 }]));
  for (const r of rows) {
    if (!summary[r.indikator]) summary[r.indikator] = { benar: 0, total: 0 };
    summary[r.indikator].total += 1;
    summary[r.indikator].benar += r.benar;
  }
  return summary;
}

// --- Reset ---------------------------------------------------------------

/** Hapus semua progress (opsi "ulangi dari awal" — FASE 9). Settings ikut direset. */
export async function resetProgress() {
  await db.transaction('rw', db.meta, db.levelStatus, db.assessment, async () => {
    await Promise.all([db.meta.clear(), db.levelStatus.clear(), db.assessment.clear()]);
  });
}
