import { LevelScene } from './LevelScene.js';
import { eventBridge, EV } from '../eventBridge.js';
import { catatJawaban } from '../../services/progress.js';
import { makeButton } from '../objects/UiButton.js';
import { WARNA } from '../../data/design.js';
import { TOKOH_L1, SOAL_L1, DIALOG_L1 } from '../../data/level1.js';

/** Posisi 4 tokoh di area 1280×720 (DESIGN.md §6 — zona tengah). */
const POSISI_TOKOH = [
  { x: 220, y: 430 },
  { x: 500, y: 460 },
  { x: 780, y: 430 },
  { x: 1060, y: 460 },
];

/**
 * Level 1 — Misi Pengamatan (PROJECT.md §4 Level 1, revisi brief klien).
 *
 * Alur: amati 4 tokoh (bebas urutan, bisa berkali-kali) → tombol "Lanjut" aktif
 * setelah semua diamati → 3 soal berurutan (Indikator 1, lalu 2× Indikator 2)
 * lewat QuizPanel → dialog penutup Pak Ali → selesai.
 *
 * TIDAK ada drag & drop kategori di level ini (sudah pindah ke Level 2).
 */
export class Level1Scene extends LevelScene {
  constructor() {
    super('Level1', 'level1', 'bg_level1');
    this.totalSteps = SOAL_L1.length;
  }

  buildLevel() {
    const { width } = this.scale;

    this.add
      .text(width / 2, 90, DIALOG_L1.instruksiAmati, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '22px',
        color: '#FBF6EC',
        align: 'center',
        backgroundColor: 'rgba(74,59,42,0.55)',
        padding: { x: 16, y: 8 },
      })
      .setOrigin(0.5);

    this.diamatiSet = new Set();
    this.soalDimulai = false;
    this.menungguAmatiUlang = false;

    TOKOH_L1.forEach((tokoh, i) => {
      const pos = POSISI_TOKOH[i];
      const img = this.add.image(pos.x, pos.y, tokoh.textureKey).setDisplaySize(200, 300);
      img.setInteractive({ useHandCursor: true });
      img.on('pointerup', () => this.amatiTokoh(tokoh));

      this.add
        .text(pos.x, pos.y + 168, tokoh.nama, {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '18px',
          color: '#FBF6EC',
        })
        .setOrigin(0.5);
    });

    // tombol alur — aksinya (this.lanjutAction) diganti-ganti sesuai tahap
    this.lanjutAction = () => this.mulaiSoal(0);
    this.lanjutBtn = makeButton(this, width / 2, 210, 'Lanjut', {
      color: WARNA.primary,
      width: 220,
      onClick: () => this.lanjutAction?.(),
    });
    this.lanjutBtn.setVisible(false);
  }

  amatiTokoh(tokoh) {
    this.diamatiSet.add(tokoh.id);
    eventBridge.emit(EV.SHOW_DIALOG, { speaker: tokoh.nama, text: tokoh.narasi });

    if (this.menungguAmatiUlang) {
      this.menungguAmatiUlang = false;
      this.lanjutBtn.setVisible(true);
    } else if (!this.soalDimulai && this.diamatiSet.size >= TOKOH_L1.length) {
      this.lanjutAction = () => this.mulaiSoal(0);
      this.lanjutBtn.setVisible(true);
    }
  }

  /** Mainkan dialog berurutan (mis. percakapan Pak Ali → Zara sebelum sebuah soal). */
  mainkanDialogBerurutan(daftar, selesai) {
    if (!daftar || !daftar.length) return selesai();
    const [pertama, ...sisanya] = daftar;
    eventBridge.emit(EV.SHOW_DIALOG, pertama);
    eventBridge.once(EV.UI_CLOSE_DIALOG, () => this.mainkanDialogBerurutan(sisanya, selesai));
  }

  mulaiSoal(index) {
    const soal = SOAL_L1[index];
    if (!soal) return this.tutupCerita();

    this.soalDimulai = true;
    this.lanjutBtn.setVisible(false);
    this.setStep(index);

    this.mainkanDialogBerurutan(soal.dialogSebelum, () => {
      eventBridge.once(EV.UI_SUBMIT_QUIZ, (hasil) => this.prosesJawaban(index, soal, hasil));
      eventBridge.emit(EV.SHOW_QUIZ, soal);
    });
  }

  async prosesJawaban(index, soal, hasil) {
    if (hasil.idSoal !== soal.idSoal) return;
    await catatJawaban(soal.idSoal, {
      level: this.levelId,
      indikator: soal.indikator,
      benar: hasil.benar,
    });
    eventBridge.once(EV.UI_CLOSE_FEEDBACK, () => this.setelahFeedback(index, soal, hasil.benar));
  }

  setelahFeedback(index, soal, benar) {
    if (benar) {
      this.mulaiSoal(index + 1);
      return;
    }
    if (soal.salahArahkanEksplorUlang) {
      // wajib amati ulang minimal 1 tokoh sebelum tombol Lanjut (retry) aktif lagi
      this.menungguAmatiUlang = true;
      this.lanjutAction = () => this.mulaiSoal(index);
      eventBridge.emit(EV.SHOW_DIALOG, { speaker: 'Zara', text: DIALOG_L1.ajakanAmatiUlang });
    } else {
      this.mulaiSoal(index); // ulangi soal yang sama langsung
    }
  }

  tutupCerita() {
    eventBridge.emit(EV.SHOW_DIALOG, { speaker: DIALOG_L1.penutupSpeaker, text: DIALOG_L1.penutup });
    eventBridge.once(EV.UI_CLOSE_DIALOG, () => this.selesaiLevel());
  }
}
