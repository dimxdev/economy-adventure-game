import Phaser from 'phaser';
import { eventBridge, EV } from '../eventBridge.js';
import { loadProgress, resetProgress } from '../../services/progress.js';
import { tentukanTujuanAwal } from '../sceneRegistry.js';
import { LEVEL_AKTIF } from '../../data/levels.js';
import { makeButton } from '../objects/UiButton.js';
import { WARNA } from '../../data/design.js';
import { TUJUAN_BELAJAR } from '../../data/learning.js';

/**
 * MenuScene — Main Menu (PROJECT.md §4):
 * judul, Zara + animasi pembuka, narasi ajakan, tombol Mulai / Lanjutkan,
 * tombol Tujuan Belajar (buka panel materi).
 */
export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  async create() {
    const { width, height } = this.scale;
    eventBridge.emit(EV.SCENE_CHANGED, { showHud: false });

    this.add.image(width / 2, height / 2, 'bg_menu').setDisplaySize(width, height);
    this.add.image(width / 2, 128, 'logo').setOrigin(0.5);

    // Zara di kiri-bawah + idle bob (animasi pembuka sederhana)
    const zara = this.add.image(232, height + 6, 'zara_idle').setOrigin(0.5, 1);
    this.tweens.add({
      targets: zara,
      y: zara.y - 14,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const colX = width / 2 + 80;

    this.add
      .text(colX, 248, '"Ayo bantu warga Desa Sejahtera\nmenyiapkan Festival Produk Lokal!"', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '22px',
        color: '#4A3B2A',
        align: 'center',
        backgroundColor: '#FBF6EC',
        padding: { x: 18, y: 14 },
      })
      .setOrigin(0.5);

    const progress = await loadProgress();
    const tujuan = tentukanTujuanAwal(progress);

    let y = 372;
    const gap = 82;

    if (tujuan.adaProgress && tujuan.lanjutLevelId) {
      makeButton(this, colX, y, 'LANJUTKAN', {
        color: WARNA.primary,
        width: 300,
        onClick: () => this.scene.start(tujuan.lanjutSceneKey),
      });
      y += gap;
      makeButton(this, colX, y, 'Mulai dari awal', {
        color: WARNA.secondary,
        width: 300,
        fontSize: 20,
        onClick: () => this.mulaiBaru(),
      });
      y += gap;
    } else {
      makeButton(this, colX, y, 'MULAI', {
        color: WARNA.primary,
        width: 300,
        onClick: () => this.scene.start(LEVEL_AKTIF[0]?.sceneKey ?? 'Level1'),
      });
      y += gap;
    }

    makeButton(this, colX, y, 'Tujuan Belajar', {
      color: WARNA.accent,
      width: 300,
      fontSize: 20,
      onClick: () => eventBridge.emit(EV.SHOW_MATERI, TUJUAN_BELAJAR),
    });
  }

  async mulaiBaru() {
    await resetProgress();
    this.scene.start(LEVEL_AKTIF[0]?.sceneKey ?? 'Level1');
  }
}
