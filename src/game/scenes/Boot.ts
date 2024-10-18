import backgroundImg from "../../assets/background.png";
import { BaseScene } from "./BaseScene";

export class Boot extends BaseScene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("background", backgroundImg);
    this.load.text(
      "PressStart2P-Regular",
      "../../assets/fonts/PressStart2P-Regular.ttf"
    );
  }

  create() {
    this.scene.start("Preloader");
  }
}
