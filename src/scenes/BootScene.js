import Drone from '../entities/Drone.js';
import Citizen from '../entities/Citizen.js';
import Projectile from '../entities/Projectile.js';
import FX from '../entities/FX.js';

export default class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    // No external assets yet — generate all textures
  }

  create() {
    // Generate placeholder textures
    Drone.generateTexture(this);
    Citizen.generateTexture(this);
    Projectile.generateTexture(this);
    FX.generateTextures(this);

    // Generate scrolling suburb background
    this.generateSuburbBG();

    this.scene.start('Menu');
  }

  generateSuburbBG() {
    const g = this.add.graphics();
    const w = 480, h = 854;

    // Grass base
    g.fillStyle(0x3a5a2a, 1);
    g.fillRect(0, 0, w, h);

    // Roads (vertical)
    g.fillStyle(0x333333, 1);
    g.fillRect(80, 0, 40, h);
    g.fillRect(240, 0, 40, h);
    g.fillRect(360, 0, 40, h);

    // Roads (horizontal)
    for (let y = 0; y < h; y += 200) {
      g.fillRect(0, y, w, 30);
      // Lane markings
      g.fillStyle(0x555555, 1);
      for (let x = 0; x < w; x += 30) {
        g.fillRect(x + 5, y + 13, 15, 3);
      }
      g.fillStyle(0x333333, 1);
    }

    // Sidewalks
    g.fillStyle(0x666655, 1);
    [76, 124, 236, 284, 356, 404].forEach(x => g.fillRect(x, 0, 4, h));

    // Buildings
    const bColors = [0x7a6a5a, 0x8a7a6a, 0x6a5a4a, 0x887766, 0x776655];
    for (let by = 30; by < h; by += 200) {
      for (let bx of [10, 130, 170, 290, 410]) {
        const bw = Phaser.Math.Between(30, 50);
        const bh = Phaser.Math.Between(25, 40);
        g.fillStyle(bColors[Math.floor(Math.random() * bColors.length)], 1);
        g.fillRect(bx, by, bw, bh);
        // Roof line
        g.fillStyle(0x554433, 1);
        g.fillRect(bx, by, bw, 3);
      }
    }

    g.generateTexture('__suburbBG', w, h);
    g.destroy();
  }
}
