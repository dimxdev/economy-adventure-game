import Phaser from 'phaser';
import { WARNA } from '../../data/design.js';

/**
 * Tombol in-canvas Phaser — DESIGN.md §7: rounded, warna solid, shadow bawah
 * (efek 3D lembut), teks Fredoka. Untuk tombol overlay HTML pakai Button.svelte.
 *
 * @returns {Phaser.GameObjects.Container}
 */
export function makeButton(scene, x, y, label, opts = {}) {
  const {
    color = WARNA.primary,
    textColor = '#FFFFFF',
    width = 260,
    height = 62,
    fontSize = 24,
    onClick,
  } = opts;

  const container = scene.add.container(x, y);
  const g = scene.add.graphics();

  const draw = (pressed) => {
    const dy = pressed ? 2 : 0;
    g.clear();
    g.fillStyle(WARNA.ink, 0.25);
    g.fillRoundedRect(-width / 2, -height / 2 + dy + 4, width, height, 18);
    g.fillStyle(color, 1);
    g.fillRoundedRect(-width / 2, -height / 2 + dy, width, height, 18);
  };
  draw(false);

  const text = scene.add
    .text(0, 0, label, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: `${fontSize}px`,
      color: textColor,
      align: 'center',
    })
    .setOrigin(0.5);

  container.add([g, text]);
  container.setSize(width, height);
  container.setInteractive(
    new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height),
    Phaser.Geom.Rectangle.Contains,
  );

  const setPressed = (p) => {
    draw(p);
    text.setY(p ? 2 : 0);
  };
  container.on('pointerover', () => scene.input.setDefaultCursor('pointer'));
  container.on('pointerout', () => {
    scene.input.setDefaultCursor('default');
    setPressed(false);
  });
  container.on('pointerdown', () => setPressed(true));
  container.on('pointerup', () => {
    setPressed(false);
    onClick?.();
  });

  return container;
}
