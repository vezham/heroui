import {ColorScale} from "../../types";
import {readableColor, swapColorValues} from "../../../utils/object";

const scale = {
  50: "#e1ffdf",
  100: "#b7feb0",
  200: "#8bfc80",
  300: "#5efb4f",
  400: "#32fa1e",
  500: "#19e105",
  600: "#0daf00",
  700: "#057d00",
  800: "#004c00",
  900: "#001b00",
};

const scale_light = scale;
const scale_dark = swapColorValues(scale);

const themeColorsLight: ColorScale = {
  ...scale_light,
  foreground: readableColor(scale_light[400]),
  DEFAULT: scale_light[400],
};

const themeColorsDark: ColorScale = {
  ...scale_dark,
  foreground: readableColor(scale_dark[600]),
  DEFAULT: scale_dark[600],
};

export const success = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
