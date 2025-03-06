import {readableColor, swapColorValues} from "../../../utils/object";
import {ColorScale} from "../../types";

export const scale = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
};

const scale_light = scale;
const scale_dark = swapColorValues(scale);

const themeColorsLight: ColorScale = {
  ...scale_light,
  foreground: readableColor(scale_light[300]),
  DEFAULT: scale_light[300],
};

const themeColorsDark: ColorScale = {
  ...scale_dark,
  // foreground: readableColor(scale_light[700]),
  // DEFAULT: scale_light[700]
  foreground: readableColor(scale_dark[200]),
  DEFAULT: scale_dark[200],
};

export const default_zinc = {
  light: themeColorsLight,
  dark: themeColorsDark,
};

export const zinc = scale;
