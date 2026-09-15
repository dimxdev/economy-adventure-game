import Phaser from 'phaser';

/**
 * eventBridge — jembatan komunikasi Phaser <-> UI Svelte.
 *
 * Aturan main (PROJECT.md §8):
 *  - Scene Phaser `emit` event (mis. 'level-progress', 'show-feedback', 'level-complete').
 *  - Komponen Svelte `on`/`once` untuk mendengar & meng-update tampilannya.
 *  - UI TIDAK ikut mengatur render loop game. Cukup kirim perintah balik lewat event
 *    (mis. UI emit 'ui:resume-level', scene mendengarkannya).
 *
 * Konvensi nama event:
 *  - dari game ke UI  : tanpa prefix  → 'level-progress', 'show-feedback', 'level-complete'
 *  - dari UI ke game  : prefix 'ui:'  → 'ui:close-feedback', 'ui:back-to-menu'
 */
export const eventBridge = new Phaser.Events.EventEmitter();

/** Daftar nama event supaya tidak salah ketik string di banyak tempat. */
export const EV = {
  // game -> UI
  BOOT_READY: 'boot-ready',
  PRELOAD_PROGRESS: 'preload-progress',
  SCENE_CHANGED: 'scene-changed',
  LEVEL_PROGRESS: 'level-progress',
  SHOW_DIALOG: 'show-dialog',
  SHOW_MATERI: 'show-materi',
  SHOW_FEEDBACK: 'show-feedback',
  SHOW_QUIZ: 'show-quiz',
  LEVEL_COMPLETE: 'level-complete',
  // UI -> game
  UI_CLOSE_DIALOG: 'ui:close-dialog',
  UI_CLOSE_FEEDBACK: 'ui:close-feedback',
  UI_CLOSE_MATERI: 'ui:close-materi',
  UI_SUBMIT_QUIZ: 'ui:submit-quiz',
  UI_BACK_TO_MENU: 'ui:back-to-menu',
  UI_TOGGLE_MUTE: 'ui:toggle-mute',
};
