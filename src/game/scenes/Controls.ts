import { MENU_SPACE_BETWEEN_ENTRIES } from "../constants";
import { menuStyles } from "../styles";
import { ControlsItem } from "../types";
import { Align } from "../utils";
import { backButtonGenerator } from "../utils/General";
import { BaseScene } from "./BaseScene";

export const CONTROLS_LIST: ControlsItem[] = [
  { control: "Flap", text: "Mouse Left Click or Tap" },
  { control: "Pause", text: "Keyboard P or Button Tap " },
];

export class Controls extends BaseScene {
  private controls: ControlsItem[] = [];
  constructor() {
    super("Controls");

    this.controls = CONTROLS_LIST;
  }

  create() {
    super.create();

    this.createBackButton();
    this.createControlsText();
  }

  private createBackButton() {
    backButtonGenerator(this, [
      this.game.scale.width / 2,
      this.game.scale.height * 0.9,
    ]);
  }

  private createControlsText() {
    let lastMenuPositionY = 0;

    this.controls.forEach((controlItem) => {
      const menuPosition = [
        this.game.scale.width / 2,
        this.game.scale.height / 2 + lastMenuPositionY,
      ];
      controlItem.textGO = this.add
        .text(
          menuPosition[0],
          menuPosition[1],
          `${controlItem.control} = ${controlItem.text}`,
          menuStyles
        )
        .setOrigin(0.5, 1);

      Align.scaleToGameWidth(this.game, controlItem.textGO, 0.5);
      lastMenuPositionY += MENU_SPACE_BETWEEN_ENTRIES;
    });
  }
}
