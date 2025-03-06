import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#fff7da",
  100: "#ffe7ad",
  200: "#ffd77d",
  300: "#ffc74b",
  400: "#ffb71a",
  500: "#e69d00",
  600: "#b37a00",
  700: "#815700",
  800: "#4e3400",
  900: "#1e1000",
};

const primary_dark_scale = {
  50: "#fff8da",
  100: "#ffeaad",
  200: "#ffdd7d",
  300: "#ffcf4b",
  400: "#ffc11a",
  500: "#e6a700",
  600: "#b38200",
  700: "#805d00",
  800: "#4e3800",
  900: "#1d1300",
};

const secondary_scale = {
  50: "#fff6da",
  100: "#ffe5ad",
  200: "#ffd47d",
  300: "#ffc24b",
  400: "#ffb11a",
  500: "#e69800",
  600: "#b37600",
  700: "#815400",
  800: "#4e3300",
  900: "#1e1000",
};

const primary_light = primary_scale;
const primary_dark = swapColorValues(primary_dark_scale);

const secondary_light = secondary_scale;
const secondary_dark = swapColorValues(secondary_scale);

const themeColorsLight: ThemeColors = {
  primary: {
    ...primary_light,
    foreground: readableColor(primary_light[400]),
    DEFAULT: primary_light[400],
  },
  secondary: {
    ...secondary_light,
    foreground: readableColor(secondary_light[400]),
    DEFAULT: secondary_light[400],
  },
};

const themeColorsDark: ThemeColors = {
  primary: {
    ...primary_dark,
    foreground: readableColor(primary_dark[500]),
    DEFAULT: primary_dark[500],
  },
  secondary: {
    ...secondary_dark,
    foreground: readableColor(secondary_dark[500]),
    DEFAULT: secondary_dark[500],
  },
};

export const yellow: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
