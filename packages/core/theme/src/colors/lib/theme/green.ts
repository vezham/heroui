import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#dffeec",
  100: "#b9f5d0",
  200: "#8fedb2",
  300: "#65e594",
  400: "#3bdd77",
  500: "#22c45d",
  600: "#169848",
  700: "#0c6d33",
  800: "#01421c",
  900: "#001803",
};

const secondary_scale = {
  50: "#e8faf0",
  100: "#d1f4e0",
  200: "#a2e9c1",
  300: "#74dfa2",
  400: "#45d483",
  500: "#17c964",
  600: "#12a150",
  700: "#0e793c",
  800: "#095028",
  900: "#052814",
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
    foreground: readableColor(primary_dark[500]),
    DEFAULT: primary_dark[500],
  },
  secondary: {
    ...secondary_dark,
    foreground: readableColor(secondary_dark[500]),
    DEFAULT: secondary_dark[500],
  },
};

export const green: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
