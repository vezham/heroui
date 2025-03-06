import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#F0FCFF",
  100: "#E6FAFE",
  200: "#D7F8FE",
  300: "#C3F4FD",
  400: "#A5EEFD",
  500: "#7EE7FC",
  600: "#06B7DB",
  700: "#09AACD",
  800: "#0E8AAA",
  900: "#053B48",
};

const secondary_scale = primary_scale;

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

export const cyan: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
