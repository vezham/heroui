import {ReactRef, useDOMRef} from "@v0xoss/react-utils";
import {PropGetter, mapPropsVariants, v0xdsHTMLProps} from "@v0xoss/system-rsc";
import {SlotsToClasses, cn} from "@v0xoss/theme";

import {tvProps, tvSlots, tva} from "./variant";

interface Props extends tvProps, v0xdsHTMLProps<"div"> {
  ref?: ReactRef<HTMLDivElement | null>;
  classNames?: SlotsToClasses<tvSlots>;
  label?: string;
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys);

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    label = "Welcome to A!",
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const slots = tva(variantProps);

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
    className: slots.base({class: cn(classNames?.base, className)}),
    ...otherProps,
  });

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getBaseProps,

    // otherProps
    label,
  };
};

export {useProps};
export type {Props};
