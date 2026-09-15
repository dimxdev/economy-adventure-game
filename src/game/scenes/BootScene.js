import Phaser from 'phaser';
import { eventBridge, EV } from '../eventBridge.js';
import { loadProgress } from '../../services/progress.js';
import { tentukanTujuanAwal } from '../sceneRegistry.js';

/**
 * BootScene — inisialisasi awal. Baca progress (untuk debug/telemetry),
 * lalu lanjut ke PreloadScene. Tidak menampilkan apa-apa yang lama.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  async create() {
    this.cameras.main.setBackgroundColor('#2e2a24');

    try {
      const progress = await loadProgress();
      eventBridge.emit(EV.BOOT_READY, { progress, tujuan: tentukanTujuanAwal(progress) });
    } catch (err) {
      console.error('[Boot] gagal load progress', err);
    }

    this.scene.start('Preload');
  }
}
