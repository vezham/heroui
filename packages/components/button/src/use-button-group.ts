import type {ButtonProps} from "./index";
import type {ReactRef} from "@v0xoss/react-utils";
import type {ButtonGroupVariantProps} from "@v0xoss/theme";
import type {HTMLHeroUIProps, PropGetter} from "@v0xoss/system";

import {buttonGroup} from "@v0xoss/theme";
import {mapPropsVariants, useProviderContext} from "@v0xoss/system";
import {useDOMRef} from "@v0xoss/react-utils";
import {useMemo, useCallback} from "react";
import {objectToDeps} from "@v0xoss/shared-utils";
interface Props extends HTMLHeroUIProps, ButtonGroupVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps["isDisabled"];
}

export type ContextType = {
  size?: ButtonProps["size"];
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  radius?: ButtonProps["radius"];
  isDisabled?: ButtonProps["isDisabled"];
  disableAnimation?: ButtonProps["disableAnimation"];
  disableRipple?: ButtonProps["disableRipple"];
  isIconOnly?: ButtonProps["isIconOnly"];
  fullWidth?: boolean;
};

export type UseButtonGroupProps = Props &
  Partial<
    Pick<
      ButtonProps,
      "size" | "color" | "radius" | "variant" | "isIconOnly" | "disableAnimation" | "disableRipple"
    >
  >;

export function useButtonGroup(originalProps: UseButtonGroupProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, buttonGroup.variantKeys);

  const {
    ref,
    as,
    children,
    color = "default",
    size = "md",
    variant = "solid",
    radius,
    isDisabled = false,
    isIconOnly = false,
    disableRipple = globalContext?.disableRipple ?? false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const classNames = useMemo(
    () =>
      buttonGroup({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      variant,
      radius,
      isIconOnly,
      isDisabled,
      disableAnimation,
      disableRipple,
      fullWidth: !!originalProps?.fullWidth,
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      disableAnimation,
      disableRipple,
      originalProps?.fullWidth,
    ],
  );

  const getButtonGroupProps: PropGetter = useCallback(
    () => ({
      role: "group",
      ...otherProps,
    }),
    [otherProps],
  );

  return {
    Component,
    children,
    domRef,
    context,
    classNames,
    getButtonGroupProps,
  };
}

export type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>;
