import type {CodeVariantProps} from "@v0xoss/theme";
import type {HTMLHeroUIProps, PropGetter} from "@v0xoss/system-rsc";
import type {ReactRef} from "@v0xoss/react-utils";

import {code} from "@v0xoss/theme";
import {mapPropsVariants} from "@v0xoss/system-rsc";
import {useMemo} from "react";
import {objectToDeps} from "@v0xoss/shared-utils";

export interface UseCodeProps extends HTMLHeroUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const {as, children, className, ...otherProps} = props;

  const Component = as || "code";

  const styles = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getCodeProps: PropGetter = () => {
    return {
      className: styles,
      ...otherProps,
    };
  };

  return {Component, children, getCodeProps};
}

export type UseCodeReturn = ReturnType<typeof useCode>;
