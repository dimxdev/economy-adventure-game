/**
 * 7 indikator kategori "Memahami" (C2) — Taksonomi Bloom revisi
 * Anderson & Krathwohl. Sumber: PROJECT.md §5.
 *
 * Dipakai untuk menandai tiap interaksi siswa saat menyimpan hasil assessment,
 * lalu direkap jadi "ringkasan pemahaman" di scene ending (FASE 9).
 */
export const INDIKATOR = {
  MENAFSIRKAN: 'menafsirkan',
  MEMBERI_CONTOH: 'memberi-contoh',
  MENGKLASIFIKASIKAN: 'mengklasifikasikan',
  MERANGKUM: 'merangkum',
  MENYIMPULKAN: 'menyimpulkan',
  MEMBANDINGKAN: 'membandingkan',
  MENJELASKAN: 'menjelaskan',
};

/** Label bahasa Indonesia untuk ditampilkan ke user (rekap pemahaman). */
export const INDIKATOR_LABEL = {
  [INDIKATOR.MENAFSIRKAN]: 'Menafsirkan',
  [INDIKATOR.MEMBERI_CONTOH]: 'Memberikan contoh',
  [INDIKATOR.MENGKLASIFIKASIKAN]: 'Mengklasifikasikan',
  [INDIKATOR.MERANGKUM]: 'Merangkum',
  [INDIKATOR.MENYIMPULKAN]: 'Menyimpulkan',
  [INDIKATOR.MEMBANDINGKAN]: 'Membandingkan',
  [INDIKATOR.MENJELASKAN]: 'Menjelaskan',
};

export const SEMUA_INDIKATOR = Object.values(INDIKATOR);
