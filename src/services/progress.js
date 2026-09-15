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

// --- Sistem poin per soal (PROJECT.md §5.2-§5.4) --------------------------

/**
 * Catat 1 kali submit jawaban untuk 1 soal, hitung poin sesuai aturan:
 *  - benar di percobaan ke-1        → 10 poin
 *  - benar di percobaan ke-2+       → 5 poin
 *  - belum pernah benar             → 0 poin
 * Idempoten terhadap poin: begitu soal pernah terjawab benar, submit berikutnya
 * (seharusnya tidak terjadi dari UI normal) tidak mengubah poin yang sudah didapat.
 *
 * @param {string} idSoal - unik per level+soal, mis. 'l1-indikator1-paktono'
 * @param {{ level: string, indikator: string, benar: boolean, refleksi?: string }} p
 * @returns {Promise<{ jumlahPercobaan: number, poinDiperoleh: number, benarAkhir: boolean }>}
 */
export async function catatJawaban(idSoal, { level, indikator, benar, refleksi } = {}) {
  const existing = await db.soalHasil.get(idSoal);
  const jumlahPercobaan = (existing?.jumlahPercobaan ?? 0) + 1;
  let poinDiperoleh = existing?.poinDiperoleh ?? 0;
  let benarAkhir = existing?.benarAkhir ?? false;

  if (benar && !benarAkhir) {
    poinDiperoleh = jumlahPercobaan === 1 ? 10 : 5;
    benarAkhir = true;
  }

  await db.soalHasil.put({
    idSoal,
    level: level ?? existing?.level ?? null,
    indikator: indikator ?? existing?.indikator ?? null,
    jumlahPercobaan,
    poinDiperoleh,
    benarAkhir,
    refleksi: refleksi ?? existing?.refleksi ?? null,
    updatedAt: Date.now(),
  });

  return { jumlahPercobaan, poinDiperoleh, benarAkhir };
}

/**
 * Rekap skor — dipakai layar ending (FASE 11): total + breakdown per indikator.
 * @returns {Promise<{ totalSkor: number, skorPerIndikator: Record<string, number> }>}
 */
export async function getSkorSummary() {
  const rows = await db.soalHasil.toArray();
  const skorPerIndikator = Object.fromEntries(SEMUA_INDIKATOR.map((k) => [k, 0]));
  let totalSkor = 0;

  for (const r of rows) {
    totalSkor += r.poinDiperoleh ?? 0;
    if (r.indikator) {
      skorPerIndikator[r.indikator] = (skorPerIndikator[r.indikator] ?? 0) + (r.poinDiperoleh ?? 0);
    }
  }

  return { totalSkor, skorPerIndikator };
}

// --- Reset ---------------------------------------------------------------

/** Hapus semua progress (opsi "ulangi dari awal" — FASE 11). Settings ikut direset. */
export async function resetProgress() {
  await db.transaction('rw', db.meta, db.levelStatus, db.assessment, db.soalHasil, async () => {
    await Promise.all([
      db.meta.clear(),
      db.levelStatus.clear(),
      db.assessment.clear(),
      db.soalHasil.clear(),
    ]);
  });
}
