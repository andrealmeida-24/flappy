import { MenuItem } from "../types";

export const menuGenerator = (
  scene: Phaser.Scene,
  menuItems: MenuItem[],
  position: [number, number] = [0, 0],
  styleOptions: Record<string, string> = {},
  spaceBetween: number,
  menuEventsHandler: (scene: Phaser.Scene, menuItem: MenuItem) => void
) => {
  let lastMenuPositionY = 0;

  menuItems.forEach((menuItem) => {
    const menuPosition = [position[0], position[1] + lastMenuPositionY];

    menuItem.textGO = scene.add
      .text(menuPosition[0], menuPosition[1], menuItem.text, {
        ...styleOptions,
      })
      .setOrigin(0.5, 1);

    lastMenuPositionY += spaceBetween;

    menuEventsHandler(scene, menuItem);
  });
};

export const backButtonGenerator = (
  scene: Phaser.Scene,
  position: [number, number] = [0, 0]
) => {
  const backButton = scene.add
    .image(position[0], position[1], "backButton")
    .setInteractive()
    .setScale(1.5);

  backButton.on("pointerup", () => {
    scene.scene.start("MainMenu");
  });
};
