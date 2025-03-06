import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#f2eafa",
  100: "#e4d4f4",
  200: "#c9a9e9",
  300: "#ae7ede",
  400: "#9353d3",
  500: "#7828c8",
  600: "#6020a0",
  700: "#481878",
  800: "#301050",
  900: "#180828",
};

const secondary_scale = {
  50: "#faf5ff",
  100: "#f3e8ff",
  200: "#e9d5ff",
  300: "#d8b4fe",
  400: "#c084fc",
  500: "#a855f7",
  600: "#9333ea",
  700: "#7e22ce",
  800: "#6b21a8",
  900: "#581c87",
};

const primary_light = primary_scale;
const primary_dark = swapColorValues(primary_scale);

const secondary_light = secondary_scale;
const secondary_dark = swapColorValues(secondary_scale);

const themeColorsLight: ThemeColors = {
  primary: {
    ...primary_light,
    foreground: readableColor(primary_light[500]),
    DEFAULT: primary_light[500],
  },
  secondary: {
    ...secondary_light,
    foreground: readableColor(secondary_light[500]),
    DEFAULT: secondary_light[500],
  },
};

const themeColorsDark: ThemeColors = {
  primary: {
    ...primary_dark,
    foreground: readableColor(primary_dark[400]),
    DEFAULT: primary_dark[400],
  },
  secondary: {
    ...secondary_dark,
    foreground: readableColor(secondary_dark[400]),
    DEFAULT: secondary_dark[400],
  },
};

export const purple: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
