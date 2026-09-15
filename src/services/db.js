import Dexie from 'dexie';

/**
 * Dexie (IndexedDB) — penyimpanan lokal per-browser. Tanpa login (PROJECT.md §6).
 *
 * Tabel:
 *  - meta        : key-value tunggal. Key yang dipakai:
 *                    'currentLevel' -> id level terakhir yang sedang/belum selesai
 *                    'settings'     -> { muted: boolean, ... }
 *  - levelStatus : status penyelesaian per level
 *                    { level, completed: 0|1, completedAt, attempts }
 *  - assessment  : 1 baris per interaksi siswa, dipetakan ke 7 indikator pemahaman
 *                    (PROJECT.md §5)
 *                    { id++, level, indikator, benar: 0|1, detail, at }
 *
 * Semua akses lewat services/progress.js — jangan query tabel langsung dari scene/UI.
 */
export const db = new Dexie('economy-adventure');

db.version(1).stores({
  meta: '&key',
  levelStatus: '&level, completed',
  assessment: '++id, level, indikator, at',
});

export default db;
