export type {
  As,
  DOMElement,
  DOMElements,
  CapitalizedDOMElements,
  DOMAttributes,
  OmitCommonProps,
  RightJoinProps,
  MergeWithAs,
  InternalForwardRefRenderFunction,
  PropsOf,
  Merge,
  HTMLHeroUIProps,
  PropGetter,
  ExtendVariantProps,
  ExtendVariantWithSlotsProps,
  ExtendVariants,
  SharedSelection,
} from "@v0xoss/system-rsc";

export {
  forwardRef,
  toIterator,
  mapPropsVariants,
  mapPropsVariantsWithCommon,
  isHeroUIEl,
  extendVariants,
} from "@v0xoss/system-rsc";

export type {SupportedCalendars} from "./types";
export type {HeroUIProviderProps} from "./provider";
export type {ProviderContextProps} from "./provider-context";

export {HeroUIProvider} from "./provider";
export {ProviderContext, useProviderContext} from "./provider-context";

export {useLabelPlacement} from "./hooks";

export {HeroUIProvider as V0xdsProvider} from "./provider";
