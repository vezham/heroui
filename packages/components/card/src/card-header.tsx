import type {HTMLHeroUIProps} from "@v0xoss/system";

import {forwardRef} from "@v0xoss/system";
import {useDOMRef} from "@v0xoss/react-utils";
import {clsx} from "@v0xoss/shared-utils";

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
