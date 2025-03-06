import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const primary_scale = {
  50: "#e1eeff",
  100: "#b1ccff",
  200: "#80aaff",
  300: "#4d88fd",
  400: "#1d66fb",
  500: "#044de2",
  600: "#003cb1",
  700: "#002b7f",
  800: "#001a4f",
  900: "#000920",
};

const secondary_scale = {
  50: "#d8f9ff",
  100: "#abe9ff",
  200: "#7bdaff",
  300: "#48caff",
  400: "#1abbff",
  500: "#00a1e6",
  600: "#007db4",
  700: "#005a82",
  800: "#003751",
  900: "#001421",
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

export const blue: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
