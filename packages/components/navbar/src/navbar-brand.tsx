import type {HTMLHeroUIProps} from "@v0xoss/system";

import {forwardRef} from "@v0xoss/system";
import {useDOMRef} from "@v0xoss/react-utils";
import {clsx} from "@v0xoss/shared-utils";

import {useNavbarContext} from "./navbar-context";

export interface NavbarBrandProps extends HTMLHeroUIProps<"div"> {
  children?: React.ReactNode | React.ReactNode[];
}

const NavbarBrand = forwardRef<"div", NavbarBrandProps>((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useNavbarContext();

  const styles = clsx(classNames?.brand, className);

  return (
    <Component ref={domRef} className={slots.brand?.({class: styles})} {...otherProps}>
      {children}
    </Component>
  );
});

NavbarBrand.displayName = "HeroUI.NavbarBrand";

export default NavbarBrand;
