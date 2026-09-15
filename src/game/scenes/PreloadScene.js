import Phaser from 'phaser';
import { WARNA } from '../../data/design.js';
import { queueAssets, buildMissingPlaceholders } from '../objects/placeholder.js';

/**
 * PreloadScene — load semua aset (manifest src/data/assets.js) dengan loading bar,
 * tunggu font Google siap, buat placeholder untuk aset yang belum ada, lalu ke Menu.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;

    this.add
      .text(cx, cy - 64, 'Economy Adventure', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '40px',
        color: '#FBF6EC',
      })
      .setOrigin(0.5);

    const barW = 440;
    const barH = 24;
    const barX = cx - barW / 2;
    const barY = cy;

    const frame = this.add.graphics();
    frame.lineStyle(3, 0xfbf6ec, 1);
    frame.strokeRoundedRect(barX - 3, barY - 3, barW + 6, barH + 6, 13);

    const bar = this.add.graphics();
    const pct = this.add
      .text(cx, cy + 44, '0%', { fontFamily: 'Nunito, sans-serif', fontSize: '18px', color: '#F5A623' })
      .setOrigin(0.5);

    this.load.on('progress', (v) => {
      bar.clear();
      bar.fillStyle(WARNA.primary, 1);
      bar.fillRoundedRect(barX, barY, Math.max(barH, barW * v), barH, 10);
      pct.setText(`${Math.round(v * 100)}%`);
    });

    queueAssets(this);
  }

  async create() {
    // tunggu font siap dulu — supaya label placeholder & teks Phaser tidak
    // render dengan font fallback
    try {
      await Promise.race([
        Promise.all([
          document.fonts.load('1em "Fredoka"'),
          document.fonts.load('700 1em "Nunito"'),
          document.fonts.ready,
        ]),
        new Promise((r) => setTimeout(r, 2500)),
      ]);
    } catch {
      /* lanjut walau font gagal dimuat */
    }

    const placeholders = buildMissingPlaceholders(this);
    if (placeholders.length) {
      console.info(
        `[Preload] ${placeholders.length} aset belum ada, pakai placeholder:`,
        placeholders.join(', '),
      );
    }

    this.scene.start('Menu');
  }
}
