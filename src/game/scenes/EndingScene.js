import Phaser from 'phaser';
import { eventBridge, EV } from '../eventBridge.js';
import { getAssessmentSummary, resetProgress } from '../../services/progress.js';
import { makeButton } from '../objects/UiButton.js';
import { WARNA } from '../../data/design.js';

/**
 * EndingScene — penutup cerita + ringkasan pemahaman (PROJECT.md §5).
 * FASE 3: stub. FASE 9: rekap 7 indikator + rangkuman perjalanan Zara.
 */
export class EndingScene extends Phaser.Scene {
  constructor() {
    super('Ending');
  }

  async create() {
    const { width, height } = this.scale;
    eventBridge.emit(EV.SCENE_CHANGED, { showHud: false });

    if (this.textures.exists('bg_ending')) {
      this.add.image(width / 2, height / 2, 'bg_ending').setDisplaySize(width, height);
    }

    this.add
      .text(width / 2, 130, 'Festival Produk Lokal Berhasil! 🎉', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '34px',
        color: '#4A3B2A',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2, 'Ending & ringkasan pemahaman siswa\ndiisi lengkap di FASE 9.', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '20px',
        color: '#4A3B2A',
        align: 'center',
      })
      .setOrigin(0.5);

    makeButton(this, width / 2, height - 108, 'Main dari awal', {
      color: WARNA.accent,
      width: 280,
      onClick: async () => {
        await resetProgress();
        this.scene.start('Menu');
      },
    });

    console.info('[Ending] ringkasan pemahaman:', await getAssessmentSummary());
  }
}
