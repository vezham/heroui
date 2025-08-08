import type {HTMLHeroUIProps} from "@vx-oss/system";

import {forwardRef} from "@vx-oss/system";
import {useDOMRef} from "@vx-oss/react-utils";
import {clsx} from "@vx-oss/shared-utils";

import {useCardContext} from "./card-context";

const CardHeader = forwardRef<"div", HTMLHeroUIProps<"div">>((props, ref) => {
  const {as, className, children, ...otherProps} = props;
  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {slots, classNames} = useCardContext();

  const headerStyles = clsx(classNames?.header, className);

  return (
    <Component ref={domRef} className={slots.header?.({class: headerStyles})} {...otherProps}>
      {children}
    </Component>
  );
});

CardHeader.displayName = "HeroUI.CardHeader";

export default CardHeader;
