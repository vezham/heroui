import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement} from "react";
import type {UseDatePickerProps} from "./use-date-picker";

import {useMemo} from "react";
import {cloneElement, isValidElement} from "react";
import {forwardRef} from "@v0xoss/system";
import {Button} from "@v0xoss/button";
import {DateInput, TimeInput} from "@v0xoss/date-input";
import {FreeSoloPopover} from "@v0xoss/popover";
import {Calendar} from "@v0xoss/calendar";
import {AnimatePresence} from "framer-motion";
import {CalendarBoldIcon} from "@v0xoss/shared-icons";

import {useDatePicker} from "./use-date-picker";

export interface Props<T extends DateValue> extends UseDatePickerProps<T> {
  /**
   * The placement of the selector button.
   * @default "end"
   */
  selectorButtonPlacement?: "start" | "end";
}

export type DatePickerProps<T extends DateValue = DateValue> = Props<T>;

const DatePicker = forwardRef(function DatePicker<T extends DateValue>(
  props: DatePickerProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {selectorButtonPlacement = "end", ...otherProps} = props;

  const {
    state,
    startContent,
    endContent,
    selectorIcon,
    showTimeField,
    disableAnimation,
    isCalendarHeaderExpanded,
    getDateInputProps,
    getPopoverProps,
    getTimeInputProps,
    getSelectorButtonProps,
    getSelectorIconProps,
    getCalendarProps,
    CalendarTopContent,
    CalendarBottomContent,
  } = useDatePicker<T>({...otherProps, ref});

  const selectorContent = isValidElement(selectorIcon) ? (
    cloneElement(selectorIcon, getSelectorIconProps())
  ) : (
    <CalendarBoldIcon {...getSelectorIconProps()} />
  );

  const calendarBottomContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return showTimeField ? (
      <>
        <TimeInput {...getTimeInputProps()} />
        {CalendarBottomContent}
      </>
    ) : (
      CalendarBottomContent
    );
  }, [state, showTimeField, CalendarBottomContent, isCalendarHeaderExpanded]);

  const calendarTopContent = useMemo(() => {
    if (isCalendarHeaderExpanded) return null;

    return CalendarTopContent;
  }, [showTimeField, CalendarTopContent, isCalendarHeaderExpanded]);

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover {...getPopoverProps()}>
      <Calendar
        {...getCalendarProps()}
        bottomContent={calendarBottomContent}
        topContent={calendarTopContent}
      />
    </FreeSoloPopover>
  ) : null;

  const dateInputProps = {
    ...getDateInputProps(),
    endContent:
      selectorButtonPlacement === "end" ? (
        <Button {...getSelectorButtonProps()}>{endContent || selectorContent}</Button>
      ) : (
        endContent
      ),
    startContent:
      selectorButtonPlacement === "start" ? (
        <Button {...getSelectorButtonProps()}>{startContent || selectorContent}</Button>
      ) : (
        startContent
      ),
  };

  return (
    <>
      <DateInput {...dateInputProps} />
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </>
  );
}) as <T extends DateValue>(props: DatePickerProps<T>) => ReactElement;

export default DatePicker;
