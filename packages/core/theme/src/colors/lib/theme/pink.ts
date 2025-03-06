import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#ffedfa",
  100: "#ffdcf5",
  200: "#ffb8eb",
  300: "#ff95e1",
  400: "#ff71d7",
  500: "#ff4ecd",
  600: "#cc3ea4",
  700: "#992f7b",
  800: "#661f52",
  900: "#331029",
};

const secondary_scale = {
  50: "#fdf2f8",
  100: "#fce7f3",
  200: "#fbcfe8",
  300: "#f9a8d4",
  400: "#f472b6",
  500: "#ec4899",
  600: "#db2777",
  700: "#be185d",
  800: "#9d174d",
  900: "#831843",
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
    foreground: readableColor(secondary_dark[300]),
    DEFAULT: secondary_dark[300],
  },
};

export const pink: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
