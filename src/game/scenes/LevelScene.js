import Phaser from 'phaser';
import { eventBridge, EV } from '../eventBridge.js';
import { setCurrentLevel, markLevelComplete, recordAssessment } from '../../services/progress.js';
import { infoLevel } from '../sceneRegistry.js';
import { makeButton } from '../objects/UiButton.js';
import { WARNA } from '../../data/design.js';

/**
 * Base class semua scene level. FASE 3 hanya menyediakan kerangka + stub isi.
 * FASE 4-7: subclass override `buildLevel(info)` dengan mekanik masing-masing,
 * lalu panggil `this.selesaiLevel(assessments)` saat misi tuntas.
 */
export class LevelScene extends Phaser.Scene {
  /**
   * @param {string} key     key scene Phaser (mis. 'Level1')
   * @param {string} levelId  id progress (mis. 'level1')
   * @param {string} [bgKey]  key aset background
   */
  constructor(key, levelId, bgKey) {
    super(key);
    this.levelId = levelId;
    this.bgKey = bgKey;
    /** jumlah langkah misi — dipakai progress bar HUD. Di-set subclass. */
    this.totalSteps = 0;
  }

  create() {
    const info = infoLevel(this.levelId);
    setCurrentLevel(this.levelId);

    eventBridge.emit(EV.SCENE_CHANGED, {
      showHud: true,
      judul: info?.judul ?? this.levelId,
      step: 0,
      totalSteps: this.totalSteps,
    });

    const { width, height } = this.scale;
    if (this.bgKey && this.textures.exists(this.bgKey)) {
      this.add.image(width / 2, height / 2, this.bgKey).setDisplaySize(width, height);
    }

    // tombol "‹ Menu" di HUD (Svelte) mengirim event ini
    const back = () => this.scene.start('Menu');
    eventBridge.once(EV.UI_BACK_TO_MENU, back);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => eventBridge.off(EV.UI_BACK_TO_MENU, back));

    this.buildLevel(info);
  }

  /** Perbarui progress bar HUD. */
  setStep(step) {
    eventBridge.emit(EV.LEVEL_PROGRESS, { step, totalSteps: this.totalSteps });
  }

  /** Override di FASE 4-7. */
  buildLevel(info) {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2 - 46, `${info?.judul ?? this.levelId}\n(stub — diisi di fase berikutnya)`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '30px',
        color: '#4A3B2A',
        align: 'center',
      })
      .setOrigin(0.5);

    makeButton(this, width / 2, height / 2 + 64, '▶ Selesaikan (sementara)', {
      color: WARNA.primary,
      width: 380,
      onClick: () => this.selesaiLevel(),
    });
  }

  /**
   * Tandai level selesai → simpan assessment → lanjut level berikutnya / ending.
   * @param {Array<{ indikator: string, benar: boolean, detail?: any }>} assessments
   */
  async selesaiLevel(assessments = []) {
    for (const a of assessments) {
      await recordAssessment({ level: this.levelId, ...a });
    }
    const { nextLevel, selesaiSemua } = await markLevelComplete(this.levelId);
    if (selesaiSemua || !nextLevel) {
      this.scene.start('Ending');
    } else {
      this.scene.start(infoLevel(nextLevel)?.sceneKey ?? 'Ending');
    }
  }
}
