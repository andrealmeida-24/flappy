import { AUTO, Game } from "phaser";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";

import { MainMenu } from "./scenes/MainMenu";
import { Controls } from "./scenes/Controls";
import { Score } from "./scenes/Score";
import { BirdGame } from "./scenes/Game";
import { Pause } from "./scenes/Pause";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  render: {
    pixelArt: true,
  },
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#94fdff",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // max: {
    //   width: 1280,
    //   height: 932,
    // },
  },
  physics: {
    default: "arcade",
  },
  parent: "game-container",
  scene: [Boot, Preloader, MainMenu, Controls, Score, BirdGame, Pause],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
