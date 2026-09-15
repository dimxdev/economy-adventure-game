<script>
  /**
   * Panel materi akhir misi — DESIGN.md §7: panel Krem Kertas besar, ikon "belajar",
   * teks Nunito ukuran nyaman, lebar terbatas (DESIGN.md §4).
   * Tiap poin boleh punya warna kategori sendiri (produksi/distribusi/konsumsi).
   */
  import { ui } from '../stores/uiState.svelte.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import Button from './Button.svelte';

  function tutup() {
    const m = ui.materi;
    ui.materi = null;
    eventBridge.emit(EV.UI_CLOSE_MATERI, m);
  }
</script>

{#if ui.materi}
  <div class="backdrop">
    <div class="panel" role="dialog" aria-modal="true" tabindex="-1" aria-label={ui.materi.judul}>
      <header>
        <span class="badge" aria-hidden="true">📖</span>
        <h2>{ui.materi.judul}</h2>
      </header>

      <ul>
        {#each ui.materi.poin ?? [] as p (p.label)}
          <li style="--dot: {p.warna ?? 'var(--c-ink)'}">
            <span class="label">{p.label}</span>
            <span class="teks">{p.teks}</span>
          </li>
        {/each}
      </ul>

      <div class="actions">
        <Button variant="primary" onclick={tutup}>{ui.materi.tombol ?? 'Mengerti!'}</Button>
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
    max-width: 560px;
    max-height: 90%;
    overflow-y: auto;
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-lift);
  }
  header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
  }
  .badge {
    font-size: 1.6rem;
  }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--c-ink);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  li {
    border-left: 6px solid var(--dot);
    padding-left: var(--space-md);
  }
  .label {
    display: block;
    font-family: var(--font-display);
    font-weight: 600;
    color: var(--dot);
  }
  .teks {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: var(--leading-body);
    color: var(--c-ink);
  }
  .actions {
    display: flex;
    justify-content: center;
    margin-top: var(--space-lg);
  }
</style>
