export default class FX {
  static generateTextures(scene) {
    // Scan ring
    const g1 = scene.add.graphics();
    g1.lineStyle(2, 0x66cc66, 0.6);
    g1.strokeCircle(32, 32, 30);
    g1.generateTexture('__scanRing', 64, 64);
    g1.destroy();

    // Explosion
    const g2 = scene.add.graphics();
    g2.fillStyle(0xff6633, 1);
    g2.fillCircle(16, 16, 14);
    g2.fillStyle(0xffcc44, 1);
    g2.fillCircle(16, 16, 8);
    g2.generateTexture('__explosion', 32, 32);
    g2.destroy();

    // Strike marker
    const g3 = scene.add.graphics();
    g3.lineStyle(2, 0xff3333, 0.8);
    g3.strokeCircle(16, 16, 14);
    g3.lineBetween(4, 16, 28, 16);
    g3.lineBetween(16, 4, 16, 28);
    g3.generateTexture('__target', 32, 32);
    g3.destroy();
  }
}
