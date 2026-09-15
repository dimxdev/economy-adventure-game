<script>
  /**
   * Progress bar — DESIGN.md §7: pill rounded, kosong = Abu lembut,
   * terisi = Daun Muda, marker langkah bulat. Dipakai di HUD.
   */
  let { value = 0, max = 0 } = $props();

  let pct = $derived(max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0);
  let markers = $derived(max > 0 ? Array.from({ length: max }, (_, i) => i + 1) : []);
</script>

<div class="pb" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
  <div class="fill" style="width: {pct}%"></div>
  <div class="markers">
    {#each markers as m (m)}
      <span class="dot" class:done={m <= value}></span>
    {/each}
  </div>
</div>

<style>
  .pb {
    position: relative;
    height: 14px;
    border-radius: var(--radius-pill);
    background: var(--c-muted);
    overflow: hidden;
  }
  .fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--c-primary);
    border-radius: var(--radius-pill);
    transition: width 0.3s ease;
  }
  .markers {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 6px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c-surface);
    opacity: 0.6;
  }
  .dot.done {
    background: var(--c-white);
    opacity: 1;
  }
</style>
