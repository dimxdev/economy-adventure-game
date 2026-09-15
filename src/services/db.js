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
 *  - assessment  : (v1, dipertahankan untuk kompatibilitas) 1 baris per interaksi lama,
 *                    { id++, level, indikator, benar: 0|1, detail, at }
 *  - soalHasil   : sistem POIN per soal (PROJECT.md §5.2-§5.4) — 1 baris per soal
 *                  (bukan per percobaan), di-upsert tiap kali siswa submit jawaban:
 *                    { idSoal (PK, unik per level+soal), level, indikator,
 *                      jumlahPercobaan, poinDiperoleh (10/5/0), benarAkhir,
 *                      refleksi (opsional, soal hybrid, tidak memengaruhi poin), updatedAt }
 *
 * Semua akses lewat services/progress.js — jangan query tabel langsung dari scene/UI.
 */
export const db = new Dexie('economy-adventure');

db.version(1).stores({
  meta: '&key',
  levelStatus: '&level, completed',
  assessment: '++id, level, indikator, at',
});

db.version(2).stores({
  soalHasil: '&idSoal, level, indikator',
});

export default db;
