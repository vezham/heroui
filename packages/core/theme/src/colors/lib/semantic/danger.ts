import {swapColorValues} from "../../../utils/object";
import {ColorScale} from "../../types";
import {common} from "../common";

const scale = {
  50: "#ffe1e1",
  100: "#ffb1b1",
  200: "#ff7f7f",
  300: "#ff4c4c",
  400: "#ff1a1a",
  500: "#e60000",
  600: "#b40000",
  700: "#810000",
  800: "#500000",
  900: "#210000",
};

const scale_light = scale;
const scale_dark = swapColorValues(scale);

const themeColorsLight: ColorScale = {
  ...scale_light,
  foreground: common.white,
  DEFAULT: scale_light[500],
};

const themeColorsDark: ColorScale = {
  ...scale_dark,
  foreground: common.white,
  DEFAULT: scale_dark[500],
};

export const danger = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
