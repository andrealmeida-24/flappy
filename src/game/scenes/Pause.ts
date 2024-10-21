import { MENU_SPACE_BETWEEN_ENTRIES } from "../constants";
import { menuStyles } from "../styles";
import { MenuItem } from "../types";
import { menuGenerator } from "../utils/General";
import { BaseScene } from "./BaseScene";

const MENU_ITEMS: MenuItem[] = [
  { scene: "GameScene", text: "Continue" },
  { scene: "MainMenu", text: "Exit" },
];

export class Pause extends BaseScene {
  private menuItems: MenuItem[] = [];
  constructor() {
    super("PauseScene");

    this.menuItems = MENU_ITEMS;
  }

  create() {
    super.create();
    this.createMenu();
  }

  private createMenu() {
    menuGenerator(
      this.scene.scene,
      this.menuItems,
      [this.game.scale.width / 2, this.game.scale.height / 2],
      menuStyles,
      MENU_SPACE_BETWEEN_ENTRIES,
      this.setupPauseMenuEvents
    );
  }

  private setupPauseMenuEvents(scene: Phaser.Scene, menuItem: MenuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#F88379" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "black" });
    });

    textGO.on("pointerup", () => {
      if (menuItem.scene && menuItem.text === "Continue") {
        scene.scene.stop();
        scene.scene.resume(menuItem.scene);
      } else {
        scene.scene.stop("GameScene");
        scene.scene.start(menuItem.scene);
      }
    });
  }
}
