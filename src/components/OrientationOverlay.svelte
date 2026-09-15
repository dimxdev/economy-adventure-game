<script>
  /**
   * Overlay orientasi — PROJECT.md §7 / DESIGN.md §7.
   * Deteksi portrait via matchMedia → tampilkan ajakan putar HP.
   * Layer paling atas, di luar Phaser. Sembunyi otomatis saat landscape.
   *
   * TODO(asset): ganti ikon 📱 dengan `ui_ikon_putarhp.png` dari tim aset.
   */
  import { onMount } from 'svelte';

  let portrait = $state(false);

  onMount(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const update = () => (portrait = mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  });
</script>

{#if portrait}
  <div class="orient" role="alertdialog" aria-label="Putar perangkat ke mode landscape">
    <div class="phone" aria-hidden="true">📱</div>
    <p>Putar HP kamu ke mode <strong>landscape</strong> ya!</p>
  </div>
{/if}

<style>
  .orient {
    position: absolute;
    inset: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
    background: var(--c-ink);
    color: var(--c-surface);
    text-align: center;
    padding: var(--space-xl);
  }
  .phone {
    font-size: 72px;
    animation: rotate-hint 2s ease-in-out infinite;
  }
  .orient p {
    font-family: var(--font-display);
    font-size: 1.4rem;
    max-width: 20ch;
    line-height: 1.4;
  }
  @keyframes rotate-hint {
    0%,
    40% {
      transform: rotate(0deg);
    }
    60%,
    100% {
      transform: rotate(-90deg);
    }
  }
</style>
