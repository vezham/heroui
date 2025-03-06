import {blue} from "./theme/blue";
import {green} from "./theme/green";
import {orange} from "./theme/orange";
import {pink} from "./theme/pink";
import {purple} from "./theme/purple";
import {red} from "./theme/red";
import {yellow} from "./theme/yellow";

export const theme = {
  blue,
  purple,
  pink,
  red,
  orange,
  yellow,
  green,
  // gray
  // indio
  // cyan
};

export const themeColors = theme;

export type ThemeColors = typeof themeColors;
