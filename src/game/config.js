import Phaser from 'phaser';
import { registerScenes, getSceneClasses } from './sceneRegistry.js';
import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { Level1Scene } from './scenes/Level1Scene.js';
import { Level2Scene } from './scenes/Level2Scene.js';
import { Level3Scene } from './scenes/Level3Scene.js';
import { Level4Scene } from './scenes/Level4Scene.js';
import { EndingScene } from './scenes/EndingScene.js';

/** Base resolution acuan — DESIGN.md §6. Semua koordinat scene pakai ruang ini. */
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

/**
 * Daftar scene. Urutan array = urutan default (Boot jalan pertama).
 * Menambah Level 5 & 6 (FASE 8): tambahkan importnya di sini + entri di
 * src/data/levels.js. Tidak ada tempat lain yang perlu diubah.
 */
registerScenes({
  Boot: BootScene,
  Preload: PreloadScene,
  Menu: MenuScene,
  Level1: Level1Scene,
  Level2: Level2Scene,
  Level3: Level3Scene,
  Level4: Level4Scene,
  Ending: EndingScene,
});

/**
 * @param {HTMLElement} parent - div container tempat canvas di-mount
 * @returns {Phaser.Types.Core.GameConfig}
 */
export function createGameConfig(parent) {
  return {
    type: Phaser.AUTO,
    parent,
    backgroundColor: '#2e2a24',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
    },
    physics: {
      default: 'arcade',
      arcade: { debug: false },
    },
    render: { antialias: true, roundPixels: true },
    scene: getSceneClasses(),
  };
}
