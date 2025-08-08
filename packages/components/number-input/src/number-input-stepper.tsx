import type {AriaButtonProps} from "@react-types/button";
import type {ButtonProps} from "@vx-oss/button";

import {Button} from "@vx-oss/button";
import {ChevronUpIcon, ChevronDownIcon} from "@vx-oss/shared-icons";

export interface NumberInputStepperProps extends Omit<ButtonProps, keyof AriaButtonProps> {
  direction: "up" | "down";
}

const NumberInputStepper = ({direction, ...otherProps}: NumberInputStepperProps) => {
  return (
    <Button disableRipple isIconOnly {...otherProps}>
      {direction == "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
};

NumberInputStepper.displayName = "HeroUI.NumberInputStepper";

export default NumberInputStepper;
