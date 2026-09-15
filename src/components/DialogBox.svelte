<script>
  /**
   * Dialog box Zara/NPC — DESIGN.md §7: panel Krem Kertas rounded, border aksen
   * lembut, teks Nunito, "ekor" speech-bubble ke arah karakter (kiri-bawah).
   * Muncul di zona bawah (DESIGN.md §6).
   */
  import { ui } from '../stores/uiState.svelte.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import Button from './Button.svelte';

  function lanjut() {
    const d = ui.dialog;
    ui.dialog = null;
    eventBridge.emit(EV.UI_CLOSE_DIALOG, d);
  }
</script>

{#if ui.dialog}
  <div class="wrap">
    <div class="bubble">
      {#if ui.dialog.speaker}
        <span class="speaker">{ui.dialog.speaker}</span>
      {/if}
      <p>{ui.dialog.text}</p>
      <div class="actions">
        <Button variant="primary" onclick={lanjut}>Lanjut</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: var(--space-lg);
    z-index: 20;
    display: flex;
    justify-content: center;
    padding: 0 var(--space-lg);
  }
  .bubble {
    position: relative;
    max-width: 640px;
    width: 100%;
    background: var(--c-surface);
    border: 2px solid var(--c-accent);
    border-radius: var(--radius-lg);
    padding: var(--space-md) var(--space-lg);
    box-shadow: var(--shadow-lift);
  }
  /* ekor speech-bubble ke arah karakter (kiri-bawah) */
  .bubble::after {
    content: '';
    position: absolute;
    left: 48px;
    bottom: -14px;
    border: 14px solid transparent;
    border-top-color: var(--c-surface);
    border-bottom: 0;
  }
  .speaker {
    display: inline-block;
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--c-accent);
    margin-bottom: var(--space-xs);
  }
  .bubble p {
    margin: 0 0 var(--space-md);
    font-family: var(--font-body);
    font-size: 1.05rem;
    line-height: var(--leading-body);
    color: var(--c-ink);
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
