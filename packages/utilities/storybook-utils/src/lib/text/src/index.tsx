import {forwardRef} from "@v0xoss/system-rsc";

import "./index.css";
import {Props, useProps} from "./types";

const Text = forwardRef<"div", Props>((props, ref) => {
  const {Component, getBaseProps} = useProps({
    ...props,
    ref,
  });

  return <Component {...getBaseProps()} />;
});

Text.displayName = "Text";

export {Text};
