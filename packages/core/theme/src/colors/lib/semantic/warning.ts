import {readableColor, swapColorValues} from "../../../utils/object";
import {ColorScale} from "../../types";

const scale = {
  50: "#fefce8",
  100: "#fdedd3",
  200: "#fbdba7",
  300: "#f9c97c",
  400: "#f7b750",
  500: "#f5a524",
  600: "#c4841d",
  700: "#936316",
  800: "#62420e",
  900: "#312107",
};

const scale_light = scale;
const scale_dark = swapColorValues(scale);

const themeColorsLight: ColorScale = {
  ...scale_light,
  foreground: readableColor(scale_light[500]),
  DEFAULT: scale_light[500],
};

const themeColorsDark: ColorScale = {
  ...scale_dark,
  foreground: readableColor(scale_dark[400]),
  DEFAULT: scale_dark[400],
};

export const warning = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
