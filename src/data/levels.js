import { INDIKATOR } from './indikator.js';

/**
 * Urutan level game — SATU SUMBER KEBENARAN.
 *
 * Game berbentuk 1 alur menyambung (PROJECT.md §2). Untuk menambah Level 5 & 6
 * nanti: cukup tambahkan entri di array ini + daftarkan scene-nya di
 * `sceneRegistry.js` + buat `src/data/level5.js`. TIDAK perlu refactor.
 *
 * Field:
 *  - id        : kunci progress (dipakai di Dexie & resume)
 *  - sceneKey  : key scene Phaser (this.scene.start(sceneKey))
 *  - judul     : ditampilkan di HUD / menu
 *  - indikator : indikator pemahaman yang dinilai di level ini (PROJECT.md §5)
 *  - tbd       : true = konten belum turun dari klien, jangan dimasukkan alur main
 */
export const LEVELS = [
  {
    id: 'level1',
    sceneKey: 'Level1',
    judul: 'Misi Pengamatan',
    // sesuai mapping resmi PROJECT.md §5.1 (revisi brief klien)
    indikator: [INDIKATOR.MENAFSIRKAN, INDIKATOR.MEMBERI_CONTOH],
  },
  {
    id: 'level2',
    sceneKey: 'Level2',
    judul: 'Tebak Profesi',
    indikator: [INDIKATOR.MENGKLASIFIKASIKAN, INDIKATOR.MEMBERI_CONTOH],
  },
  {
    id: 'level3',
    sceneKey: 'Level3',
    judul: 'Petualangan Produksi',
    indikator: [INDIKATOR.MENYIMPULKAN, INDIKATOR.MENAFSIRKAN],
  },
  {
    id: 'level4',
    sceneKey: 'Level4',
    judul: 'Jalur Distribusi',
    indikator: [INDIKATOR.MENYIMPULKAN, INDIKATOR.MENJELASKAN, INDIKATOR.MEMBANDINGKAN],
  },
  // --- Slot Level 5 & 6 (FASE 8) — aktifkan saat detail dari klien turun ---
  // { id: 'level5', sceneKey: 'Level5', judul: 'Studi Kasus Masalah Distribusi',
  //   indikator: [INDIKATOR.MENJELASKAN, INDIKATOR.MENYIMPULKAN], tbd: true },
  // { id: 'level6', sceneKey: 'Level6', judul: 'Kegiatan Konsumsi',
  //   indikator: [INDIKATOR.MENGKLASIFIKASIKAN, INDIKATOR.MEMBERI_CONTOH], tbd: true },
];

/** Scene setelah semua level selesai (FASE 9). */
export const ENDING_SCENE_KEY = 'Ending';
export const MENU_SCENE_KEY = 'Menu';

/** Level yang benar-benar dimainkan sekarang (buang yang masih TBD). */
export const LEVEL_AKTIF = LEVELS.filter((l) => !l.tbd);
