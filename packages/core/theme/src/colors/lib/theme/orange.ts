import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#ffeddd",
  100: "#ffcdb0",
  200: "#ffac80",
  300: "#fd8c4e",
  400: "#fb6b1d",
  500: "#e25204",
  600: "#b13e01",
  700: "#7e2c00",
  800: "#4d1900",
  900: "#200600",
};

const secondary_scale = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
  800: "#9a3412",
  900: "#7c2d12",
};

const primary_light = primary_scale;
const primary_dark = swapColorValues(primary_scale);

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
    foreground: readableColor(secondary_light[500]),
    DEFAULT: secondary_light[500],
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

export const orange: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
