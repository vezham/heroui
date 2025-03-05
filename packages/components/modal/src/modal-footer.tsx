import {forwardRef, HTMLHeroUIProps} from "@v0xoss/system";
import {useDOMRef} from "@v0xoss/react-utils";
import {clsx} from "@v0xoss/shared-utils";

import {useModalContext} from "./modal-context";

export interface ModalFooterProps extends HTMLHeroUIProps<"footer"> {}

const ModalFooter = forwardRef<"footer", ModalFooterProps>((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames} = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "footer";

  return (
    <Component
      ref={domRef}
      className={slots.footer({class: clsx(classNames?.footer, className)})}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalFooter.displayName = "HeroUI.ModalFooter";

export default ModalFooter;
