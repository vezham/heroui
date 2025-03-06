import {readableColor, swapColorValues} from "../../../utils/object";
import {ThemeBaseColors, ThemeColors} from "../../types";

const scale = {
  50: "#ffe3e3",
  100: "#ffb6b6",
  200: "#f88888",
  300: "#f35858",
  400: "#f03d3d",
  500: "#cf2a2a",
  600: "#a70a0c",
  700: "#770507",
  800: "#4a0102",
  900: "#200000",
};
// const primary_scale = {
//   25: '#fff9f9',
//   50: '#fff1f1',
//   75: '#ffe0e0',
//   100: '#ffc7c7',
//   200: '#ffa7a7',
//   300: '#ff8080',
//   400: '#f95e5e',
//   500: '#f03d3d',
//   600: '#cf2a2a',
//   700: '#a41f1f',
//   800: '#591a1a',
//   900: '#271111'
// }

const secondary_scale = {
  50: "#ffe5e2",
  100: "#ffbab6",
  200: "#f88f87",
  300: "#f36258",
  400: "#ef362a",
  500: "#d51d10",
  600: "#a7150c",
  700: "#780d07",
  800: "#4a0601",
  900: "#200000",
};

const primary_light = scale;
const primary_dark = swapColorValues(scale);

// const primary_light = primary_scale
// const primary_dark = swapColorValues(primary_scale)

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

export const red: ThemeBaseColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};
