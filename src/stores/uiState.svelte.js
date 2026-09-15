/**
 * State UI overlay global (Svelte 5 runes). Diisi oleh UiLayer saat menerima
 * event dari scene Phaser lewat eventBridge — komponen tinggal membaca.
 *
 * Scene TIDAK menyentuh objek ini langsung; komunikasinya via event (PROJECT.md §8).
 */
export const ui = $state({
  /** HUD atas — indikator level + progress. */
  hud: { visible: false, judul: '', step: 0, totalSteps: 0 },

  /** Audio mute (disinkronkan ke settings di Dexie). */
  muted: false,

  /** Dialog box Zara/NPC — { speaker, text } atau null. */
  dialog: null,

  /** Panel materi akhir misi — { judul, poin: [{ label, teks, warna }] } atau null. */
  materi: null,

  /** Feedback benar/salah — { benar: boolean, pesan: string } atau null. */
  feedback: null,

  /** Soal pilihan ganda aktif — { idSoal, penanya?, pertanyaan, opsi: [{id, teks, benar, feedback?}], feedbackBenar?, feedbackSalah? } atau null. */
  quiz: null,
});

/** Reset semua overlay (dipakai saat pindah scene). */
export function resetOverlay() {
  ui.dialog = null;
  ui.materi = null;
  ui.feedback = null;
  ui.quiz = null;
}
