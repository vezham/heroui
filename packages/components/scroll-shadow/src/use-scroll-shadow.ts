import type {ScrollShadowVariantProps} from "@v0xoss/theme";
import type {HTMLHeroUIProps, PropGetter} from "@v0xoss/system";
import type {ReactRef} from "@v0xoss/react-utils";
import type {UseDataScrollOverflowProps} from "@v0xoss/use-data-scroll-overflow";

import {mapPropsVariants} from "@v0xoss/system";
import {scrollShadow} from "@v0xoss/theme";
import {useDOMRef} from "@v0xoss/react-utils";
import {useDataScrollOverflow} from "@v0xoss/use-data-scroll-overflow";
import {useMemo} from "react";
import {objectToDeps} from "@v0xoss/shared-utils";

interface Props extends HTMLHeroUIProps<"div">, Omit<UseDataScrollOverflowProps, "domRef"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The shadow size in pixels.
   * @default 40
   */
  size?: number;
}

export type UseScrollShadowProps = Props & ScrollShadowVariantProps;

export function useScrollShadow(originalProps: UseScrollShadowProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, scrollShadow.variantKeys);

  const {
    ref,
    as,
    children,
    className,
    style,
    size = 40,
    offset = 0,
    visibility = "auto",
    isEnabled = true,
    onVisibilityChange,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  useDataScrollOverflow({
    domRef,
    offset,
    visibility,
    isEnabled,
    onVisibilityChange,
    updateDeps: [children],
    overflowCheck: originalProps.orientation ?? "vertical",
  });

  const styles = useMemo(
    () =>
      scrollShadow({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getBaseProps: PropGetter = (props = {}) => ({
    ref: domRef,
    className: styles,
    "data-orientation": originalProps.orientation ?? "vertical",
    style: {
      "--scroll-shadow-size": `${size}px`,
      ...style,
      ...props.style,
    },
    ...otherProps,
    ...props,
  });

  return {Component, styles, domRef, children, getBaseProps};
}

export type UseScrollShadowReturn = ReturnType<typeof useScrollShadow>;
