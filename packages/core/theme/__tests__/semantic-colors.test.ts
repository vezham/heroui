import {getContrast} from "color2k";
import {get} from "@v0xoss/shared-utils";

import {semanticColors} from "../src/colors/lib/semantic";
import {themeColors} from "../src/colors/lib/theme";

type Guideline = keyof typeof guidelines;

const guidelines = {decorative: 1.5, readable: 3, aa: 4.5, aaa: 7};
const targetGuideline: Guideline = "readable";

const testGoodContrast = (
  colorPath: string,
  backgroundPath: string,
  standard: Guideline,
  theme = false,
) => {
  const colorPalette = theme ? themeColors : semanticColors;
  const color = get(colorPalette, colorPath);
  const background = get(colorPalette, backgroundPath);

  it(`${colorPath}(${color}) has enough contrast with ${backgroundPath}(${background}) to be ${standard}`, () => {
    expect(getContrast(color, background)).toBeGreaterThanOrEqual(guidelines[standard]);
  });
};

describe("semanticColors", () => {
  ["light", "dark"].forEach((mode) => {
    describe(mode, () => {
      testGoodContrast(`${mode}.divider.DEFAULT`, `${mode}.background.DEFAULT`, "decorative");
      testGoodContrast(`${mode}.foreground.DEFAULT`, `${mode}.background.DEFAULT`, targetGuideline);
      ["default", "content1", "content2", "content3", "content4"].forEach((name) => {
        testGoodContrast(`${mode}.foreground.DEFAULT`, `${mode}.${name}.DEFAULT`, targetGuideline);
        testGoodContrast(`${mode}.${name}.foreground`, `${mode}.${name}.DEFAULT`, targetGuideline);
      });
      ["success", "warning", "danger", "info"].forEach((name) => {
        testGoodContrast(`${mode}.${name}.foreground`, `${mode}.${name}.DEFAULT`, targetGuideline);
      });
    });
  });
});

describe("Theme Colors", () => {
  ["light", "dark"].forEach((mode) => {
    describe(mode, () => {
      Object.keys(themeColors).forEach((theme) => {
        ["primary"].forEach((name) => {
          testGoodContrast(
            `${theme}.${mode}.${name}.foreground`,
            `${theme}.${mode}.${name}.DEFAULT`,
            targetGuideline,
            true,
          );
        });
      });
    });
  });
});
