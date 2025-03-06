import {commonColors} from "./common";
import {semanticColors} from "./semantic";
// import {commonColors} from "./lib/common";
// import {semanticColors} from "./lib/semantic";
import {themeColors} from "./lib/theme";

export * from "./types";

const colors = {
  ...commonColors,
  ...semanticColors,
};

export {themeColors, colors, commonColors, semanticColors};
