/**
 * Based on tw-colors by L-Blondy
 * @see https://github.com/L-Blondy/tw-colors
 */

import Color from "color";
import plugin from "tailwindcss/plugin.js";
import deepMerge from "deepmerge";
import {omit, kebabCase, mapKeys} from "@v0xoss/shared-utils";

import {commonColors} from "./colors/lib/common";
import {semanticColors} from "./colors/lib/semantic";
import {themeColors} from "./colors/lib/theme";
import {animations} from "./animations";
import {utilities} from "./utilities";
import {flattenThemeObject} from "./utils/object";
import {isBaseTheme} from "./utils/theme";
import {ConfigTheme, ConfigThemes, DefaultThemeType, HeroUIPluginConfig} from "./types";
import {lightLayout, darkLayout, defaultLayout} from "./default-layout";
import {baseStyles} from "./utils/classes";
import {DEFAULT_TRANSITION_DURATION} from "./utilities/transition";

const DEFAULT_PREFIX = "v0x";

const v0xattr = {
  color: "vcolor",
  mode: "vmode",
};

const parsedColorsCache: Record<string, number[]> = {};

type TflatColors = Record<string, string>;

type Tresolved = {
  variants: {name: string; definition: string[]}[];
  utilities: Record<string, Record<string, any>>;
  colors: Record<
    string,
    ({opacityValue, opacityVariable}: {opacityValue: string; opacityVariable: string}) => string
  >;
};

const resolveColor = (
  resolved: Tresolved,
  prefix: string,
  cssSelector: string,
  flatColors: TflatColors,
) => {
  for (const [colorName, colorValue] of Object.entries(flatColors)) {
    if (!colorValue) return;

    try {
      const parsedColor = parsedColorsCache[colorValue] || Color(colorValue).hsl().round(2).array();

      parsedColorsCache[colorValue] = parsedColor;

      const [h, s, l, defaultAlphaValue] = parsedColor;
      const herouiColorVariable = `--${prefix}-${colorName}`;
      const herouiOpacityVariable = `--${prefix}-${colorName}-opacity`;

      // set the css variable in "@layer utilities"
      resolved.utilities[cssSelector]![herouiColorVariable] = `${h} ${s}% ${l}%`;
      // if an alpha value was provided in the color definition, store it in a css variable
      if (typeof defaultAlphaValue === "number") {
        resolved.utilities[cssSelector]![herouiOpacityVariable] = defaultAlphaValue.toFixed(2);
      }
      // set the dynamic color in tailwind config theme.colors
      resolved.colors[colorName] = ({opacityVariable, opacityValue}) => {
        // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
        if (!isNaN(+opacityValue)) {
          return `hsl(var(${herouiColorVariable}) / ${opacityValue})`;
        }
        // if no opacityValue was provided (=it is not parsable to a number)
        // the herouiOpacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
        // over the tw class based opacity(e.g. "bg-opacity-90")
        // This is how tailwind behaves as for v3.2.4
        if (opacityVariable) {
          return `hsl(var(${herouiColorVariable}) / var(${herouiOpacityVariable}, var(${opacityVariable})))`;
        }

        return `hsl(var(${herouiColorVariable}) / var(${herouiOpacityVariable}, 1))`;
      };
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log("error", error?.message);
    }
  }
};

// @internal
const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved: Tresolved = {
    variants: [],
    utilities: {},
    colors: {},
  };

  for (const [themeName, {extend, layout, colors}] of Object.entries(themes)) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;
    const scheme = themeName === "light" || themeName === "dark" ? themeName : extend;

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          "color-scheme": scheme,
        }
      : {};

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    /**
     * Colors
     */
    // flatten color definitions
    const flatColors: TflatColors = flattenThemeObject(colors);

    resolveColor(resolved, prefix, cssSelector, flatColors);

    /**
     * Layout
     */
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {};

    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) return;

      const layoutVariablePrefix = `--${prefix}-${key}`;

      if (typeof value === "object") {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`;

          resolved.utilities[cssSelector]![nestedLayoutVariable] = nestedValue;
        }
      } else {
        // Handle opacity values and other singular layout values
        const formattedValue =
          layoutVariablePrefix.includes("opacity") && typeof value === "number"
            ? value.toString().replace(/^0\./, ".")
            : value;

        resolved.utilities[cssSelector]![layoutVariablePrefix] = formattedValue;
      }
    }
  }

  return resolved;
};

const themeColorConfig = (prefix: string) => {
  const resolved: Tresolved = {
    variants: [],
    utilities: {},
    colors: {},
  };

  const mode: DefaultThemeType[] = ["light", "dark"];

  mode.forEach((theme_mode) => {
    for (const [theme_color] of Object.entries(themeColors)) {
      const cssSelector = `:root,.${v0xattr.mode}-${theme_mode}.${v0xattr.color}-${theme_color}`;

      resolved.utilities[cssSelector] = {};

      resolved.variants.push({
        name: theme_mode,
        definition: [`&.${v0xattr.mode}-${theme_mode}.${v0xattr.color}-${theme_color}`],
      });

      /**
       * Colors
       */
      // flatten color definitions

      // @ts-ignore
      const tcolor = themeColors[theme_color][theme_mode];
      const flatColors: TflatColors = flattenThemeObject(tcolor);

      resolveColor(resolved, prefix, cssSelector, flatColors);
      // console.log('flatColors | ', flatColors)
    }
  });

  return resolved;
};

const corePlugin = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
  addCommonColors: boolean,
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix);
  const resolved_theme_color = themeColorConfig(prefix);

  const createStripeGradient = (stripeColor: string, backgroundColor: string) =>
    `linear-gradient(45deg,  hsl(var(--${prefix}-${stripeColor})) 25%,  hsl(var(--${prefix}-${backgroundColor})) 25%,  hsl(var(--${prefix}-${backgroundColor})) 50%,  hsl(var(--${prefix}-${stripeColor})) 50%,  hsl(var(--${prefix}-${stripeColor})) 75%,  hsl(var(--${prefix}-${backgroundColor})) 75%,  hsl(var(--${prefix}-${backgroundColor})))`;

  // console.log('resolved | ', JSON.stringify(resolved))
  // console.log('resolved_theme_color | ', JSON.stringify(resolved_theme_color))
  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      // add base classNames
      addBase({
        [":root, [data-theme]"]: {
          ...baseStyles(prefix),
        },
      });

      // add the css variables to "@layer utilities"
      addUtilities({...resolved?.utilities, ...resolved_theme_color.utilities, ...utilities});
      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
      resolved_theme_color?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
    },
    // extend the colors config
    {
      theme: {
        extend: {
          // @ts-ignore
          colors: {
            ...(addCommonColors ? commonColors : {}),
            ...resolved?.colors,
            ...resolved_theme_color?.colors,
          },
          scale: {
            "80": "0.8",
            "85": "0.85",
          },
          height: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          width: {
            divider: `var(--${prefix}-divider-weight)`,
          },
          fontSize: {
            tiny: [`var(--${prefix}-font-size-tiny)`, `var(--${prefix}-line-height-tiny)`],
            small: [`var(--${prefix}-font-size-small)`, `var(--${prefix}-line-height-small)`],
            medium: [`var(--${prefix}-font-size-medium)`, `var(--${prefix}-line-height-medium)`],
            large: [`var(--${prefix}-font-size-large)`, `var(--${prefix}-line-height-large)`],
          },
          borderRadius: {
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`,
          },
          opacity: {
            hover: `var(--${prefix}-hover-opacity)`,
            disabled: `var(--${prefix}-disabled-opacity)`,
          },
          borderWidth: {
            small: `var(--${prefix}-border-width-small)`,
            medium: `var(--${prefix}-border-width-medium)`,
            large: `var(--${prefix}-border-width-large)`,
            1: "1px",
            1.5: "1.5px",
            3: "3px",
            5: "5px",
          },
          boxShadow: {
            small: `var(--${prefix}-box-shadow-small)`,
            medium: `var(--${prefix}-box-shadow-medium)`,
            large: `var(--${prefix}-box-shadow-large)`,
          },
          backgroundSize: {
            "stripe-size": "1.25rem 1.25rem",
          },
          backgroundImage: {
            "stripe-gradient-default": createStripeGradient("default-200", "default-400"),
            "stripe-gradient-primary": createStripeGradient("primary-200", "primary"),
            "stripe-gradient-secondary": createStripeGradient("secondary-200", "secondary"),
            "stripe-gradient-success": createStripeGradient("success-200", "success"),
            "stripe-gradient-warning": createStripeGradient("warning-200", "warning"),
            "stripe-gradient-danger": createStripeGradient("danger-200", "danger"),
            "stripe-gradient-info": createStripeGradient("info-200", "info"),
          },
          transitionDuration: {
            0: "0ms",
            250: "250ms",
            400: "400ms",
            DEFAULT: DEFAULT_TRANSITION_DURATION,
          },
          transitionTimingFunction: {
            "soft-spring": "cubic-bezier(0.155, 1.105, 0.295, 1.12)",
          },
          ...animations,
        },
      },
    },
  );
};

export const heroui = (config: HeroUIPluginConfig = {}): ReturnType<typeof plugin> => {
  const {
    themes: themeObject = {},
    defaultTheme = "light",
    layout: userLayout,
    defaultExtendTheme = "light",
    prefix: defaultPrefix = DEFAULT_PREFIX,
    addCommonColors = false,
  } = config;

  const userLightColors = themeObject?.light?.colors || {};
  const userDarkColors = themeObject?.dark?.colors || {};

  const defaultLayoutObj =
    userLayout && typeof userLayout === "object"
      ? deepMerge(defaultLayout, userLayout)
      : defaultLayout;

  const baseLayouts = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout,
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout,
    },
  };

  // get other themes from the config different from light and dark
  let otherThemes = omit(themeObject, ["light", "dark"]) || {};

  Object.entries(otherThemes).forEach(([themeName, {extend, colors, layout}]) => {
    const baseTheme = extend && isBaseTheme(extend) ? extend : defaultExtendTheme;

    if (colors && typeof colors === "object") {
      otherThemes[themeName].colors = deepMerge(semanticColors[baseTheme], colors);
    }
    if (layout && typeof layout === "object") {
      otherThemes[themeName].layout = deepMerge(
        extend ? baseLayouts[extend] : defaultLayoutObj,
        layout,
      );
    }
  });

  const light: ConfigTheme = {
    layout: deepMerge(baseLayouts.light, themeObject?.light?.layout || {}),
    colors: deepMerge(semanticColors.light, userLightColors),
  };

  const dark = {
    layout: deepMerge(baseLayouts.dark, themeObject?.dark?.layout || {}),
    colors: deepMerge(semanticColors.dark, userDarkColors),
  };

  const themes = {
    light,
    dark,
    ...otherThemes,
  };

  return corePlugin(themes, defaultTheme, defaultPrefix, addCommonColors);
};

export const vezham = heroui;
