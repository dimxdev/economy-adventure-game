<script>
  /**
   * HUD global (DESIGN.md §6 zona Atas): judul level + progress bar,
   * tombol kembali ke menu, tombol mute audio.
   * Tampil hanya saat scene meminta (ui.hud.visible).
   */
  import { ui } from '../stores/uiState.svelte.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import { saveSettings } from '../services/progress.js';
  import ProgressBar from './ProgressBar.svelte';

  function backToMenu() {
    eventBridge.emit(EV.UI_BACK_TO_MENU);
  }

  async function toggleMute() {
    ui.muted = !ui.muted;
    await saveSettings({ muted: ui.muted });
    eventBridge.emit(EV.UI_TOGGLE_MUTE, ui.muted);
  }
</script>

{#if ui.hud.visible}
  <header class="hud">
    <button class="icon" onclick={backToMenu} aria-label="Kembali ke menu">‹&nbsp;Menu</button>

    <div class="center">
      {#if ui.hud.judul}<span class="judul">{ui.hud.judul}</span>{/if}
      {#if ui.hud.totalSteps > 0}
        <ProgressBar value={ui.hud.step} max={ui.hud.totalSteps} />
      {/if}
    </div>

    <button class="icon" onclick={toggleMute} aria-label={ui.muted ? 'Bunyikan audio' : 'Bisukan audio'}>
      {ui.muted ? '🔇' : '🔊'}
    </button>
  </header>
{/if}

<style>
  .hud {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-lg);
    background: linear-gradient(var(--c-ink) 0%, rgba(74, 59, 42, 0) 100%);
  }
  .center {
    flex: 1;
    max-width: 420px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .judul {
    font-family: var(--font-display);
    font-size: 0.95rem;
    color: var(--c-surface);
    text-align: center;
  }
  .icon {
    flex: none;
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--c-ink);
    background: var(--c-surface);
    border: none;
    border-radius: var(--radius-pill);
    padding: 0.35em 0.9em;
    cursor: pointer;
    box-shadow: var(--shadow-soft);
    -webkit-tap-highlight-color: transparent;
  }
  .icon:active {
    transform: translateY(1px);
  }
</style>
