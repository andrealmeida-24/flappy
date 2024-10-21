import {
  bestScoreInGameTextStyles,
  countdownTextStyles,
  scoreTextStyles,
} from "../styles";
import { Difficulties, GameDifficulty } from "../types";

import { BaseScene } from "./BaseScene";

const FLAP_VELOCITY: number = 250;
const BIRD_POSITION = { x: window.innerWidth * 0.1, y: window.innerHeight / 2 };
const BIRD_GRAVITY: number = 400;
const PIPES_TO_RENDER: number = 10;
const PIPES_X_VELOCITY: number = -200;
const DEFAULT_PIPES_COLORS: number[] = [
  0xe97451, 0xd27d2d, 0xff7f50, 0xb87333, 0xff5f1f, 0xf89880, 0xfa8072,
];
const GAME_DIFFICULTIES: Difficulties = {
  easy: {
    pipeVerticalDistanceRange: [150, 250],
    pipeHorizontalDistanceRange: [400, 550],
  },
  normal: {
    pipeVerticalDistanceRange: [140, 190],
    pipeHorizontalDistanceRange: [280, 330],
  },
  hard: {
    pipeVerticalDistanceRange: [120, 170],
    pipeHorizontalDistanceRange: [250, 310],
  },
};
const INITIAL_DIFFICULTY: GameDifficulty = "easy";
const COUNTDOWN_INITIAL_TIME: number = 3;
const DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS: number = 1000;

export class BirdGame extends BaseScene {
  bird!: Phaser.Physics.Arcade.Sprite;
  pipes!: Phaser.Physics.Arcade.Group;
  pipesColors: number[];
  difficulties: Difficulties;
  currentDifficulty: GameDifficulty;
  isPaused: boolean;
  flapVelocity: number;
  score: number;
  bestScore: number;
  scoreText: Phaser.GameObjects.Text | null;
  bestScoreText: Phaser.GameObjects.Text | null;
  pauseEvent!: Phaser.Events.EventEmitter;
  timedEvent!: Phaser.Time.TimerEvent;
  initialTime!: number;
  countDownText!: Phaser.GameObjects.Text;

  constructor() {
    super("GameScene");

    this.pipesColors = DEFAULT_PIPES_COLORS;
    this.difficulties = GAME_DIFFICULTIES;
    this.currentDifficulty = INITIAL_DIFFICULTY;
    this.isPaused = false;
    this.flapVelocity = FLAP_VELOCITY;
    this.score = 0;
    this.bestScore = 0;
    this.scoreText = null;
    this.bestScoreText = null;
  }

  create() {
    super.create();
    this.createBird();
    this.createPipes();
    this.handleInputs();
    this.createScore();
    this.createPause();
    this.handleEvents();
    this.resetDifficulty();
    this.createColliders();
  }

  update() {
    this.checkBirdCanvasCollision();
    this.recyclePipes();
  }

  private animateBird() {
    this.anims.create({
      key: "birdFlap",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.bird.play("birdFlap");
  }

  private createBird() {
    this.bird = this.physics.add
      .sprite(BIRD_POSITION.x, BIRD_POSITION.y, "bird")
      .setScale(2)
      .setOrigin(0);

    if (this.bird.body) {
      this.bird.body.setSize(this.bird.width - 2, this.bird.height - 4);
      this.bird.body.gravity.y = BIRD_GRAVITY;
    }
    this.animateBird();
    this.bird.setCollideWorldBounds(true);
  }

  private createColliders() {
    this.physics.add.collider(
      this.bird,
      this.pipes,
      this.gameOver,
      undefined,
      this
    );
  }

  private gameOver() {
    this.physics.pause();
    this.bird.stop();
    this.bird.setTint(0xff0000);

    const bestScoreText = localStorage.getItem("bestScore");
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem("bestScore", this.score.toString());
    }

    this.time.addEvent({
      delay: DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  private createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const randomColor = this.generateRandomPipesColor();
      const upperPipe = this.pipes
        .create(0, 0, "pipe")
        .setTint(randomColor)
        .setImmovable(true)
        .setOrigin(0, 1);
      const lowerPipe = this.pipes
        .create(0, 0, "pipe")
        .setTint(randomColor)
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(PIPES_X_VELOCITY);
  }

  private placePipe(
    upper: Phaser.Physics.Arcade.Body,
    lower: Phaser.Physics.Arcade.Body
  ) {
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostXPosition = this.getRightMostPipePosition();
    const pipeVerticalDistance = Phaser.Math.Between(
      difficulty.pipeVerticalDistanceRange[0],
      difficulty.pipeVerticalDistanceRange[1]
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      50,
      this.game.scale.height - pipeVerticalDistance
    );

    const pipeHorizontalDistance = Phaser.Math.Between(
      difficulty.pipeHorizontalDistanceRange[0],
      difficulty.pipeHorizontalDistanceRange[1]
    );

    upper.x = rightMostXPosition + pipeHorizontalDistance;
    upper.y = pipeVerticalPosition;

    lower.x = upper.x;
    lower.y = upper.y + pipeVerticalDistance;
  }

  private recyclePipes() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tempPipes: any[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pipes.getChildren().forEach((pipe: any) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(tempPipes[0], tempPipes[1]);
          this.increaseScore();
          this.increaseDifficulty();
          return;
        }
      }
    });
  }

  private generateRandomPipesColor() {
    const randomIndex = Math.floor(Math.random() * this.pipesColors.length);
    return this.pipesColors[randomIndex];
  }

  private getRightMostPipePosition() {
    let rightMostX = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pipes.getChildren().forEach((pipe: any) => {
      rightMostX = Math.max(rightMostX, pipe.x);
    });

    return rightMostX;
  }

  private flap() {
    if (this.isPaused) {
      return;
    }

    if (this.bird.body) {
      this.bird.body.velocity.y = -this.flapVelocity;
    }
  }

  private pauseGame() {
    this.physics.pause();
    this.scene.pause();
    this.scene.launch("PauseScene", {
      scene: this,
      pausedScene: this,
    });
  }

  private handleInputs() {
    // for desktop events
    this.input.on("pointerdown", this.flap, this);
    //for mobile events
    this.input.on("touch", this.flap, this);

    if (this.input.keyboard) {
      // all events
      this.input.keyboard.on("keydown-P", this.pauseGame, this);
    }
  }

  private createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem("bestScore");
    this.scoreText = this.add.text(
      16,
      16,
      `Score: ${this.score}`,
      scoreTextStyles
    );

    this.bestScoreText = this.add.text(
      16,
      32,
      `Best score: ${bestScore || 0}`,
      bestScoreInGameTextStyles
    );
  }

  private createPause() {
    this.isPaused = false;
    const pauseButton = this.add
      .image(
        this.game.scale.width - 24,
        this.game.scale.height - 24,
        "pauseButton"
      )
      .setScale(2)
      .setInteractive();

    pauseButton.on("pointerdown", () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch("PauseScene");
    });

    pauseButton.on("touch", () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch("PauseScene");
    });
  }

  private handleEvents() {
    if (this.pauseEvent) {
      return;
    }

    this.pauseEvent = this.events.on("resume", () => {
      this.initialTime = COUNTDOWN_INITIAL_TIME;
      this.countDownText = this.add
        .text(
          this.game.scale.width / 2,
          this.game.scale.height / 2,
          `Fly in: ${this.initialTime}`,
          countdownTextStyles
        )
        .setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: DELAY_UNTIL_GAME_RESTART_AFTER_GAME_OVER_IN_MS,
        callback: this.countDown,
        callbackScope: this,
        loop: true,
      });
    });
  }

  private countDown() {
    this.initialTime--;
    this.countDownText.setText(`Fly in: ${this.initialTime}`);
    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countDownText.setText("");
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  private increaseDifficulty() {
    if (this.score === 20) {
      this.currentDifficulty = "normal";
    }

    if (this.score === 40) {
      this.currentDifficulty = "hard";
    }
  }

  private resetDifficulty() {
    return this.currentDifficulty === "easy";
  }

  private checkBirdCanvasCollision() {
    if (
      this.bird.y <= 0 ||
      this.bird.getBounds().bottom >= window.innerHeight
    ) {
      this.gameOver();
    }
  }

  private increaseScore() {
    this.score++;
    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.score}`);
    }

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
  }
}
