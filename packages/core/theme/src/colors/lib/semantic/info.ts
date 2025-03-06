import {swapColorValues} from "../../../utils/object";
import {ColorScale} from "../../types";
import {common} from "../common";

const scale = {
  50: "#e6f1fe",
  100: "#cce3fd",
  200: "#99c7fb",
  300: "#66aaf9",
  400: "#338ef7",
  500: "#006FEE",
  600: "#005bc4",
  700: "#004493",
  800: "#002e62",
  900: "#001731",
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
  DEFAULT: scale_dark[400],
};

export const info = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
