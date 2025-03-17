import {forwardRef} from "@v0xoss/system-rsc";

import {Props, useProps} from "./types";

const A = forwardRef<"div", Props>((props, ref) => {
  const {Component, getBaseProps, children, label} = useProps({
    ...props,
    ref,
  });

  return (
    <Component {...getBaseProps()}>
      {label ? <h1>{label}</h1> : null}
      {children}
    </Component>
  );
});

A.displayName = "A";

export {A};
