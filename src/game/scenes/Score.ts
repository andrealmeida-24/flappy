import { SCORE_SPACE_BETWEEN_TEXT } from "../constants";
import { bestScoreTextStyles } from "../styles";
import { backButtonGenerator } from "../utils/General";
import { BaseScene } from "./BaseScene";

export class Score extends BaseScene {
  constructor() {
    super("ScoreScene");
  }

  create() {
    super.create();
    this.createBackButton();

    this.createBestScoreLabelText();
    this.createBestScoreText();
  }

  private createBackButton() {
    backButtonGenerator(this, [
      this.game.scale.width / 2,
      this.game.scale.height * 0.9,
    ]);
  }

  private createBestScoreLabelText() {
    this.add
      .text(
        this.game.scale.width / 2,
        this.game.scale.height / 2 - SCORE_SPACE_BETWEEN_TEXT,
        `Best Score`,
        bestScoreTextStyles
      )
      .setOrigin(0.5, 1);
  }

  private createBestScoreText() {
    const bestScore = localStorage.getItem("bestScore");
    this.add
      .text(
        this.game.scale.width / 2,
        this.game.scale.height / 2 + SCORE_SPACE_BETWEEN_TEXT,
        `${bestScore || 0}`,
        bestScoreTextStyles
      )
      .setOrigin(0.5, 1);
  }
}
