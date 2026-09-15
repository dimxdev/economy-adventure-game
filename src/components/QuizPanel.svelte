<script>
  /**
   * Soal pilihan ganda (single-select) — DESIGN.md §11.2 varian "pilihan ganda
   * kalimat penuh": tiap opsi jadi card rounded, dipilih → border Daun Muda tebal.
   *
   * Evaluasi benar/salah dilakukan DI SINI (data opsi sudah bawa flag `benar` +
   * feedback per-opsi dari scene), lalu hasilnya di-emit balik ke scene lewat
   * `ui:submit-quiz` supaya scene bisa mencatat skor (catatJawaban) & lanjut alur.
   */
  import { ui } from '../stores/uiState.svelte.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import Button from './Button.svelte';

  let dipilih = $state(null);

  // reset pilihan tiap kali soal baru muncul
  $effect(() => {
    ui.quiz;
    dipilih = null;
  });

  function periksa() {
    const soal = ui.quiz;
    const opsi = soal?.opsi.find((o) => o.id === dipilih);
    if (!soal || !opsi) return;

    const benar = !!opsi.benar;
    const pesan = opsi.feedback ?? (benar ? soal.feedbackBenar : soal.feedbackSalah);

    ui.quiz = null;
    ui.feedback = { benar, pesan };
    eventBridge.emit(EV.UI_SUBMIT_QUIZ, { idSoal: soal.idSoal, benar });
  }
</script>

{#if ui.quiz}
  <div class="backdrop">
    <div class="panel" role="dialog" aria-modal="true" tabindex="-1" aria-label={ui.quiz.pertanyaan}>
      {#if ui.quiz.penanya}
        <span class="penanya">{ui.quiz.penanya} bertanya:</span>
      {/if}
      <h3>{ui.quiz.pertanyaan}</h3>

      <div class="opsi">
        {#each ui.quiz.opsi as o (o.id)}
          <button class="kartu-opsi" class:terpilih={dipilih === o.id} onclick={() => (dipilih = o.id)}>
            {o.teks}
          </button>
        {/each}
      </div>

      <div class="actions">
        <Button variant="primary" disabled={dipilih == null} onclick={periksa}>Periksa</Button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: absolute;
    inset: 0;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(74, 59, 42, 0.45);
    padding: var(--space-lg);
  }
  .panel {
    width: 100%;
    max-width: 640px;
    max-height: 90%;
    overflow-y: auto;
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-lift);
  }
  .penanya {
    display: block;
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--c-accent);
    margin-bottom: var(--space-xs);
  }
  h3 {
    margin: 0 0 var(--space-md);
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 1.15rem;
    line-height: var(--leading-body);
    color: var(--c-ink);
  }
  .opsi {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .kartu-opsi {
    text-align: left;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--c-ink);
    background: var(--c-white);
    border: 2px solid var(--c-muted);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    cursor: pointer;
    transition: border-color 0.12s ease, transform 0.08s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .kartu-opsi:hover {
    border-color: var(--c-secondary);
  }
  .kartu-opsi.terpilih {
    border-color: var(--c-primary);
    border-width: 3px;
    font-weight: 700;
  }
  .kartu-opsi:active {
    transform: scale(0.99);
  }
  .actions {
    display: flex;
    justify-content: center;
    margin-top: var(--space-lg);
  }
</style>
