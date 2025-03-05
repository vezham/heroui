import {Spinner} from "@v0xoss/spinner";
import {Ripple} from "@v0xoss/ripple";
import {forwardRef} from "@v0xoss/system";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<"button", ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly,
  } = useButton({...props, ref});

  return (
    <Component ref={domRef} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {isLoading && isIconOnly ? null : children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  );
});

Button.displayName = "HeroUI.Button";

export default Button;
