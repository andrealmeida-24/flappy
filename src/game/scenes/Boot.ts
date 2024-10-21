import backgroundImg from "../../assets/background.png";
import { BaseScene } from "./BaseScene";

export class Boot extends BaseScene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("background", backgroundImg);
  }

  create() {
    this.scene.start("Preloader");
    this.scene.remove("Boot");
  }
}
