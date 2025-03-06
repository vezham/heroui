import type {SemanticBaseColors, SemanticColors} from "../types";

import {swapColorValues} from "../../utils/object";

import {danger} from "./semantic/danger";
import {info} from "./semantic/info";
import {success} from "./semantic/success";
import {warning} from "./semantic/warning";
import {default_zinc, zinc} from "./semantic/zinc";

const semantic = {
  zinc,
  info,
  success,
  danger,
  warning,
};

const base: SemanticBaseColors = {
  light: {
    background: {
      DEFAULT: "#FFFFFF",
    },
    foreground: {
      ...semantic.zinc,
      DEFAULT: "#11181C",
    },
    divider: {
      DEFAULT: "#11111126",
    },
    focus: {
      DEFAULT: semantic.info.light[500],
    },
    overlay: {
      DEFAULT: "#000000",
    },
    content1: {
      DEFAULT: "#FFFFFF",
      foreground: "#11181C",
    },
    content2: {
      DEFAULT: semantic.zinc[100],
      foreground: semantic.zinc[800],
    },
    content3: {
      DEFAULT: semantic.zinc[200],
      foreground: semantic.zinc[700],
    },
    content4: {
      DEFAULT: semantic.zinc[300],
      foreground: semantic.zinc[600],
    },
  },
  dark: {
    background: {
      DEFAULT: "#000000",
    },
    foreground: {
      ...swapColorValues(semantic.zinc),
      DEFAULT: "#ECEDEE",
    },
    divider: {
      DEFAULT: "#ffffff26",
    },
    focus: {
      DEFAULT: semantic.info.dark[400],
    },
    overlay: {
      DEFAULT: "#000000",
    },
    content1: {
      DEFAULT: semantic.zinc[900],
      foreground: semantic.zinc[50],
    },
    content2: {
      DEFAULT: semantic.zinc[800],
      foreground: semantic.zinc[100],
    },
    content3: {
      DEFAULT: semantic.zinc[700],
      foreground: semantic.zinc[200],
    },
    content4: {
      DEFAULT: semantic.zinc[600],
      foreground: semantic.zinc[300],
    },
  },
};

const semanticColorsLight: SemanticColors = {
  ...base.light,
  default: default_zinc.light,
  success: success.light,
  warning: warning.light,
  danger: danger.light,
  info: info.light,
};

const semanticColorsDark: SemanticColors = {
  ...base.dark,
  default: default_zinc.dark,
  success: success.dark,
  warning: warning.dark,
  danger: danger.dark,
  info: info.dark,
};

const semanticColors = {
  light: semanticColorsLight,
  dark: semanticColorsDark,
};

export {semantic, semanticColors};
