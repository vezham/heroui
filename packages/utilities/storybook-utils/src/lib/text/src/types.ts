import {ReactNode} from "react";
import {ReactRef, useDOMRef} from "@v0xoss/react-utils";
import {SlotsToClasses, cn} from "@v0xoss/theme";
import {mapPropsVariants, PropGetter, v0xdsHTMLProps} from "@v0xoss/system-rsc";

import {tvProps, tvSlots, tva} from "./variant";

interface Props extends tvProps, v0xdsHTMLProps<"div", "content"> {
  ref?: ReactRef<HTMLDivElement | null>;
  classNames?: SlotsToClasses<tvSlots>;
  content?: string | ReactNode;
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys);

  const {as, id, ref, children, className, classNames, content, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const slots = tva(variantProps);

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
    className: slots.base({class: cn(classNames?.base, className)}),
    children: content,
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
    content,
  };
};

export {useProps};
export type {Props};
