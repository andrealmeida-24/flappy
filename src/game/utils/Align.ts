export class Align {
  static scaleToGameWidth(
    game: Phaser.Game,
    obj: Phaser.GameObjects.Image | Phaser.GameObjects.Text,
    percentage: number
  ) {
    obj.displayWidth = game.scale.width * percentage;
    obj.scaleY = obj.scaleX;
  }

  static centerVertically(
    game: Phaser.Game,
    obj: Phaser.GameObjects.Image | Phaser.GameObjects.Text
  ) {
    obj.y = game.scale.height / 2 - obj.displayHeight / 2;
  }

  static centerHorizontally(
    game: Phaser.Game,
    obj: Phaser.GameObjects.Image | Phaser.GameObjects.Text
  ) {
    obj.x = game.scale.width / 2 - obj.displayWidth / 2;
  }

  static center(
    game: Phaser.Game,
    obj: Phaser.GameObjects.Image | Phaser.GameObjects.Text
  ) {
    this.centerHorizontally(game, obj);
    this.centerVertically(game, obj);
  }
}
