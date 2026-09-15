<script>
  /**
   * Tombol utama — DESIGN.md §7: rounded, warna solid, shadow bawah (efek 3D lembut),
   * teks Fredoka tebal. Varian:
   *   primary   → Daun Muda   (aksi positif: Mulai / Lanjut)
   *   accent    → Mentari     (ulangi / coba lagi)
   *   secondary → Langit      (menu / netral)
   *   ghost     → transparan  (aksi minor)
   */
  let {
    variant = 'primary',
    type = 'button',
    disabled = false,
    onclick,
    children,
  } = $props();
</script>

<button class="btn {variant}" {type} {disabled} {onclick}>
  {@render children?.()}
</button>

<style>
  .btn {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--c-white);
    border: none;
    border-radius: var(--radius-pill);
    padding: 0.6em 1.4em;
    cursor: pointer;
    box-shadow: var(--shadow-btn);
    transition: transform 0.08s ease, filter 0.12s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .btn:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow: 0 2px 0 rgba(74, 59, 42, 0.25);
  }
  .btn:disabled {
    background: var(--c-muted);
    box-shadow: none;
    cursor: default;
    color: var(--c-surface);
  }
  .primary {
    background: var(--c-primary);
  }
  .accent {
    background: var(--c-accent);
  }
  .secondary {
    background: var(--c-secondary);
  }
  .ghost {
    background: transparent;
    color: var(--c-ink);
    box-shadow: none;
  }
  .btn:hover:not(:disabled) {
    filter: brightness(1.05);
  }
</style>
