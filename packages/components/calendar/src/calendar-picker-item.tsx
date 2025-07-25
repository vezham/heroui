import type {AriaButtonProps} from "@v0xoss/use-aria-button";
import type {HTMLHeroUIProps} from "@v0xoss/system";

import {useAriaButton} from "@v0xoss/use-aria-button";
import {useHover} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {forwardRef} from "react";
import {useDOMRef, filterDOMProps} from "@v0xoss/react-utils";
import {dataAttr, mergeProps} from "@v0xoss/shared-utils";

const CalendarPickerItem = forwardRef<
  HTMLButtonElement,
  HTMLHeroUIProps<"button"> & AriaButtonProps
>(({children, autoFocus, isDisabled, onKeyDown, ...otherProps}, ref) => {
  const domRef = useDOMRef(ref);

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(
    {
      elementType: "button",
      isDisabled,
      onKeyDown,
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const {isHovered, hoverProps} = useHover({isDisabled});

  return (
    <button
      ref={domRef}
      data-disabled={dataAttr(isDisabled)}
      data-focus={dataAttr(isFocused)}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-pressed={dataAttr(isPressed)}
      data-slot="picker-item"
      {...mergeProps(
        focusProps,
        hoverProps,
        ariaButtonProps,
        filterDOMProps(otherProps, {enabled: true}),
      )}
    >
      {children}
    </button>
  );
});

CalendarPickerItem.displayName = "CalendarPickerItem";

export {CalendarPickerItem};
