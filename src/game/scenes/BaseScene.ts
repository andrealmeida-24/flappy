import { Scene } from "phaser";
import { MenuItem } from "../types";

export class BaseScene extends Scene {
  constructor(key: string) {
    super(key);
  }

  create() {
    this.createBackground();
  }

  public createBackground() {
    this.add
      .image(0, 0, "background")
      .setDisplaySize(this.game.scale.width, this.game.scale.height)
      .setOrigin(0, 0)
      .setScrollFactor(0);
  }

  public setupMenuEvents(scene: Phaser.Scene, menuItem: MenuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#F88379" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "black" });
    });

    textGO.on("pointerup", () => {
      if (menuItem.scene) {
        scene.scene.start(menuItem.scene);
      }
    });
  }
}
