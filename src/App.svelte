<script>
  import { onMount } from 'svelte';
  import GameContainer from './components/GameContainer.svelte';
  import UiLayer from './components/UiLayer.svelte';
  import OrientationOverlay from './components/OrientationOverlay.svelte';
  import { eventBridge, EV } from './game/eventBridge.js';
  import { loadSettings } from './services/progress.js';
  import { ui } from './stores/uiState.svelte.js';

  const DEV = import.meta.env.DEV;
  let bootInfo = $state(null);
  let DevPanel = $state(null);

  onMount(() => {
    // sinkronkan mute dari settings tersimpan
    loadSettings().then((s) => (ui.muted = s.muted));

    // DevPanel hanya di-load saat dev — tidak masuk bundle produksi
    if (DEV) import('./components/DevPanel.svelte').then((m) => (DevPanel = m.default));

    const onBoot = (payload) => (bootInfo = payload ?? {});
    eventBridge.on(EV.BOOT_READY, onBoot);
    return () => eventBridge.off(EV.BOOT_READY, onBoot);
  });
</script>

<main>
  <GameContainer />
  <UiLayer />
  <OrientationOverlay />

  {#if DEV}
    {#if DevPanel}<DevPanel />{/if}
    {#if bootInfo}
      <p class="debug">
        boot-ready ✓ — ada progress: {bootInfo.tujuan?.adaProgress ? 'ya' : 'tidak'}
      </p>
    {/if}
  {/if}
</main>

<style>
  main {
    position: absolute;
    inset: 0;
  }
  .debug {
    position: absolute;
    left: var(--space-md);
    bottom: var(--space-md);
    z-index: 200;
    margin: 0;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    background: var(--c-surface);
    color: var(--c-ink);
    font-size: 12px;
    opacity: 0.7;
  }
</style>
