<script>
  /**
   * Panel uji khusus development (import.meta.env.DEV). TIDAK ikut ke build produksi.
   * Gunanya menguji sistem progress/resume FASE 1 tanpa perlu scene level yang asli:
   * tandai level selesai → reload → cek game lanjut dari titik yang benar.
   */
  import { onMount } from 'svelte';
  import { loadProgress, markLevelComplete, resetProgress } from '../services/progress.js';
  import { daftarLevelId } from '../game/sceneRegistry.js';
  import { eventBridge, EV } from '../game/eventBridge.js';
  import { DESIGN } from '../data/design.js';

  let snapshot = $state(null);
  const levels = daftarLevelId();

  async function refresh() {
    snapshot = await loadProgress();
  }
  onMount(refresh);

  async function complete(id) {
    await markLevelComplete(id);
    await refresh();
  }
  async function reset() {
    await resetProgress();
    await refresh();
  }

  // --- Uji overlay FASE 2: emit event dummy seolah dari scene Phaser ---
  const uji = {
    dialog: () =>
      eventBridge.emit(EV.SHOW_DIALOG, {
        speaker: 'Zara',
        text: 'Halo! Ayo bantu warga Desa Sejahtera menyiapkan festival.',
      }),
    benar: () => eventBridge.emit(EV.SHOW_FEEDBACK, { benar: true, pesan: 'Hebat, itu benar!' }),
    salah: () =>
      eventBridge.emit(EV.SHOW_FEEDBACK, { benar: false, pesan: 'Belum tepat, ayo coba lagi.' }),
    materi: () =>
      eventBridge.emit(EV.SHOW_MATERI, {
        judul: '3 Kegiatan Ekonomi',
        poin: [
          { label: DESIGN.KATEGORI.produksi.label, teks: 'Kegiatan menghasilkan barang atau jasa.', warna: DESIGN.KATEGORI.produksi.css },
          { label: DESIGN.KATEGORI.distribusi.label, teks: 'Kegiatan menyalurkan barang dari produsen ke konsumen.', warna: DESIGN.KATEGORI.distribusi.css },
          { label: DESIGN.KATEGORI.konsumsi.label, teks: 'Kegiatan memakai atau menghabiskan barang/jasa.', warna: DESIGN.KATEGORI.konsumsi.css },
        ],
      }),
    hud: () =>
      eventBridge.emit(EV.LEVEL_PROGRESS, { judul: 'Misi Pengamatan', step: 2, totalSteps: 5 }),
    hudOff: () => eventBridge.emit(EV.SCENE_CHANGED, { showHud: false }),
  };
</script>

<aside class="dev">
  <strong>DEV · progress</strong>
  {#if snapshot}
    <div class="row">current: <code>{snapshot.currentLevel}</code></div>
    <div class="row">
      selesai: <code>{snapshot.completed.join(', ') || '—'}</code>
      {#if snapshot.selesaiSemua}<span class="done">SEMUA ✓</span>{/if}
    </div>
  {/if}
  <div class="btns">
    {#each levels as id (id)}
      <button onclick={() => complete(id)}>selesai {id}</button>
    {/each}
    <button class="reset" onclick={reset}>reset</button>
    <button onclick={() => location.reload()}>reload</button>
  </div>

  <strong>DEV · overlay</strong>
  <div class="btns">
    <button onclick={uji.dialog}>dialog</button>
    <button onclick={uji.benar}>feedback ✓</button>
    <button onclick={uji.salah}>feedback ✗</button>
    <button onclick={uji.materi}>materi</button>
    <button onclick={uji.hud}>HUD on</button>
    <button onclick={uji.hudOff}>HUD off</button>
  </div>
</aside>

<style>
  .dev {
    position: absolute;
    top: var(--space-sm);
    right: var(--space-sm);
    z-index: 200;
    max-width: 260px;
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
    background: var(--c-surface);
    color: var(--c-ink);
    font-size: 11px;
    line-height: 1.4;
    box-shadow: var(--shadow-soft);
    opacity: 0.92;
  }
  .row {
    margin-top: 2px;
  }
  code {
    background: var(--c-muted);
    border-radius: 4px;
    padding: 0 4px;
  }
  .done {
    color: var(--c-primary);
    font-weight: 700;
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: var(--space-sm);
  }
  button {
    font: inherit;
    border: 0;
    border-radius: var(--radius-sm);
    padding: 4px 8px;
    background: var(--c-secondary);
    color: var(--c-white);
    cursor: pointer;
  }
  button.reset {
    background: var(--c-warning);
  }
</style>
