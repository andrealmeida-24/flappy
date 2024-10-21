import { BaseScene } from "./BaseScene";

import backButtonImg from "../../assets/back.png";
import birdSprite from "../../assets/birdSprite.png";
import pauseButtonImg from "../../assets/pause.png";
import pipeImg from "../../assets/pipeWhite.png";
import gameFont from "../../assets/fonts/PressStart2P-Regular.ttf";
import { loadFont } from "../utils/FontLoader";

export class Preloader extends BaseScene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("backButton", backButtonImg);
    this.load.image("pauseButton", pauseButtonImg);
    this.load.image("pipe", pipeImg);

    loadFont("PressStart2P-Regular", gameFont);

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
