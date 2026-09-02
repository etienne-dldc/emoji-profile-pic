export interface EmojiTransform {
  scale: number;
  x: number;
  y: number;
  rotation: number;
}

export const EMOJI_BASE_SCALE = 0.65;

export const DEFAULT_TRANSFORM: EmojiTransform = {
  scale: 1,
  x: 0,
  y: 0,
  rotation: 0,
};
