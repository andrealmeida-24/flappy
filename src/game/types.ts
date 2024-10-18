type TextInteraction = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textGO?: any;
};

export type MenuItem = {
  scene: string;
  text: string;
} & TextInteraction;

export type ControlsItem = {
  [key: string]: string;
} & TextInteraction;
