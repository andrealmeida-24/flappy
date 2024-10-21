import { BaseScene } from "./BaseScene";

import { menuStyles, mainMenuTitleStyles } from "../styles";
import { MENU_SPACE_BETWEEN_ENTRIES } from "../constants";
import { MenuItem } from "../types";
import { Align } from "../utils";
import { menuGenerator } from "../utils/General";

const MENU_ITEMS = [
  { scene: "GameScene", text: "New Game" },
  { scene: "ScoreScene", text: "Best Score" },
  { scene: "Controls", text: "Controls" },
];

export class MainMenu extends BaseScene {
  private menuItems: MenuItem[] = [];

  constructor() {
    super("MainMenu");

    this.menuItems = MENU_ITEMS;
  }

  create() {
    super.create();

    this.createMenu();
    this.createTitle();
  }

  private createMenu() {
    menuGenerator(
      this.scene.scene,
      this.menuItems,
      [this.game.scale.width / 2, this.game.scale.height / 2],
      menuStyles,
      MENU_SPACE_BETWEEN_ENTRIES,
      super.setupMenuEvents
    );
  }

  private createTitle() {
    const title = this.add.text(
      0,
      this.game.scale.height * 0.2,
      "Flappy",
      mainMenuTitleStyles
    );
    Align.centerHorizontally(this.game, title);
  }

  public resize(): void {}
}
