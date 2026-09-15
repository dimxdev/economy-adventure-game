<script>
  /**
   * Feedback benar/salah — DESIGN.md §7 & §1 (prinsip 4: feedback selalu ramah).
   *   benar : ikon bintang emas + panel border hijau, pop kecil ceria
   *   salah : ikon silang rounded Merah Bata Lembut + border merah lembut,
   *           pesan mendorong ("ayo coba lagi") — TIDAK galak
   */
  import { ui } from '../stores/uiState.svelte.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import Button from './Button.svelte';

  function tutup() {
    const f = ui.feedback;
    ui.feedback = null;
    eventBridge.emit(EV.UI_CLOSE_FEEDBACK, f);
  }
</script>

{#if ui.feedback}
  {@const benar = ui.feedback.benar}
  <div class="backdrop">
    <div class="card" class:benar class:salah={!benar} role="alert">
      <div class="icon" aria-hidden="true">{benar ? '⭐' : '✕'}</div>
      <p>{ui.feedback.pesan ?? (benar ? 'Hebat, itu benar!' : 'Belum tepat, ayo coba lagi.')}</p>
      <Button variant={benar ? 'primary' : 'accent'} onclick={tutup}>
        {benar ? 'Lanjut' : 'Coba lagi'}
      </Button>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: absolute;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(74, 59, 42, 0.35);
    padding: var(--space-lg);
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    text-align: center;
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    border: 3px solid;
    padding: var(--space-lg) var(--space-xl);
    box-shadow: var(--shadow-lift);
    animation: pop 0.22s ease;
    max-width: 420px;
  }
  .card.benar {
    border-color: var(--c-primary);
  }
  .card.salah {
    border-color: var(--c-warning);
  }
  .icon {
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 2rem;
    color: var(--c-white);
  }
  .benar .icon {
    background: var(--c-accent);
  }
  .salah .icon {
    background: var(--c-warning);
  }
  .card p {
    margin: 0;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1.1rem;
    line-height: var(--leading-body);
    color: var(--c-ink);
  }
  @keyframes pop {
    from {
      transform: scale(0.85);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
