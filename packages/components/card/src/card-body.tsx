import {forwardRef, HTMLHeroUIProps} from "@v0xoss/system";
import {useDOMRef} from "@v0xoss/react-utils";
import {clsx} from "@v0xoss/shared-utils";

import {useCardContext} from "./card-context";

const CardBody = forwardRef<"div", HTMLHeroUIProps<"div">>((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useCardContext();

  const bodyStyles = clsx(classNames?.body, className);

  return (
    <Component ref={domRef} className={slots.body?.({class: bodyStyles})} {...otherProps}>
      {children}
    </Component>
  );
});

CardBody.displayName = "HeroUI.CardBody";

export default CardBody;
