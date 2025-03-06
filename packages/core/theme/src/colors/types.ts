export type ColorScale =
  | Partial<{
      25: string;
      50: string;
      75: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      foreground: string;
      DEFAULT: string;
    }>
  | string;

export type BaseColors = {
  background: ColorScale;
  foreground: ColorScale;
  divider: ColorScale;
  overlay: ColorScale;
  focus: ColorScale;
  content1: ColorScale;
  content2: ColorScale;
  content3: ColorScale;
  content4: ColorScale;
};

// colors:semantic
export type SemanticColors = BaseColors & {
  default: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  danger: ColorScale;
  info: ColorScale;
};

export type SemanticBaseColors = {
  light: BaseColors;
  dark: BaseColors;
};

// colors:theme
export type ThemeColors = {
  primary: ColorScale;
  secondary: ColorScale;
};

export type ThemeBaseColors = {
  light: ThemeColors;
  dark: ThemeColors;
};
