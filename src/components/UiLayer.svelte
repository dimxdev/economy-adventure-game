<script>
  /**
   * UiLayer — perekat overlay Svelte ↔ event dari scene Phaser.
   * Dengarkan event di `eventBridge`, update `ui` state, komponen ikut ter-render.
   * Semua komponen di sini ada di atas canvas Phaser (lihat z-index tokens).
   */
  import { onMount } from 'svelte';
  import { ui, resetOverlay } from '../stores/uiState.svelte.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import Hud from './Hud.svelte';
  import DialogBox from './DialogBox.svelte';
  import MateriPanel from './MateriPanel.svelte';
  import FeedbackModal from './FeedbackModal.svelte';

  onMount(() => {
    /** Scene berganti → atur visibilitas HUD, bersihkan modal sisa. */
    const onScene = (d = {}) => {
      resetOverlay();
      ui.hud.visible = !!d.showHud;
      if (d.judul != null) ui.hud.judul = d.judul;
      if (d.totalSteps != null) ui.hud.totalSteps = d.totalSteps;
      ui.hud.step = d.step ?? 0;
    };
    /** Kemajuan di dalam level. */
    const onProgress = (d = {}) => {
      ui.hud.visible = true;
      if (d.judul != null) ui.hud.judul = d.judul;
      if (d.totalSteps != null) ui.hud.totalSteps = d.totalSteps;
      if (d.step != null) ui.hud.step = d.step;
    };
    const onDialog = (d) => (ui.dialog = d);
    const onMateri = (d) => (ui.materi = d);
    const onFeedback = (d) => (ui.feedback = d);

    eventBridge.on(EV.SCENE_CHANGED, onScene);
    eventBridge.on(EV.LEVEL_PROGRESS, onProgress);
    eventBridge.on(EV.SHOW_DIALOG, onDialog);
    eventBridge.on(EV.SHOW_MATERI, onMateri);
    eventBridge.on(EV.SHOW_FEEDBACK, onFeedback);

    return () => {
      eventBridge.off(EV.SCENE_CHANGED, onScene);
      eventBridge.off(EV.LEVEL_PROGRESS, onProgress);
      eventBridge.off(EV.SHOW_DIALOG, onDialog);
      eventBridge.off(EV.SHOW_MATERI, onMateri);
      eventBridge.off(EV.SHOW_FEEDBACK, onFeedback);
    };
  });
</script>

<div class="ui-layer">
  <Hud />
  <DialogBox />
  <MateriPanel />
  <FeedbackModal />
</div>

<style>
  /* container tembus klik; hanya elemen interaktif anak yang menangkap pointer */
  .ui-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .ui-layer :global(button),
  .ui-layer :global(.backdrop),
  .ui-layer :global(.wrap),
  .ui-layer :global(.hud) {
    pointer-events: auto;
  }
</style>
