import backButtonImg from "../../assets/back.png";
import birdSprite from "../../assets/birdSprite.png";
import pauseButtonImg from "../../assets/pause.png";
import pipeImg from "../../assets/pipeWhite.png";
import { BaseScene } from "./BaseScene";

export class Preloader extends BaseScene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("backButton", backButtonImg);
    this.load.image("pauseButton", pauseButtonImg);
    this.load.image("pipe", pipeImg);

    this.load.spritesheet("bird", birdSprite, {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.scene.start("MainMenu");
    this.scene.remove("Preloader");
  }
}
