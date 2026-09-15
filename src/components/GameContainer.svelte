<script>
  import { onMount, onDestroy } from 'svelte';
  import Phaser from 'phaser';
  import { createGameConfig } from '../game/config.js';

  /** @type {HTMLDivElement} */
  let host;
  /** @type {Phaser.Game | null} */
  let game = null;

  onMount(() => {
    host.replaceChildren(); // buang canvas sisa (mis. akibat HMR)
    game = new Phaser.Game(createGameConfig(host));
    if (import.meta.env.DEV) window.__game = game;
  });

  onDestroy(() => {
    // cleanup wajib — cegah dobel canvas / memory leak saat HMR atau unmount
    game?.destroy(true);
    game = null;
    host?.replaceChildren();
  });
</script>

<div class="game-host" bind:this={host}></div>

<style>
  .game-host {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  /* canvas dikelola Phaser Scale Manager (FIT + CENTER_BOTH) */
  .game-host :global(canvas) {
    display: block;
  }
</style>
