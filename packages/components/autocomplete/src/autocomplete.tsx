import {forwardRef} from "@v0xoss/system";
import {FreeSoloPopover} from "@v0xoss/popover";
import {ScrollShadow} from "@v0xoss/scroll-shadow";
import {ChevronDownIcon, CloseIcon} from "@v0xoss/shared-icons";
import {Listbox} from "@v0xoss/listbox";
import {Button} from "@v0xoss/button";
import {Input} from "@v0xoss/input";
import {ForwardedRef, ReactElement} from "react";
import {AnimatePresence} from "framer-motion";

import {UseAutocompleteProps, useAutocomplete} from "./use-autocomplete";

interface Props<T> extends UseAutocompleteProps<T> {}

export type AutocompleteProps<T extends object = object> = Props<T>;

const Autocomplete = forwardRef(function Autocomplete<T extends object>(
  props: AutocompleteProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    Component,
    isOpen,
    disableAnimation,
    selectorIcon = <ChevronDownIcon />,
    clearIcon = <CloseIcon />,
    endContent,
    getBaseProps,
    getSelectorButtonProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getEmptyPopoverProps,
    getClearButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps,
  } = useAutocomplete<T>({...props, ref});

  const listboxProps = getListBoxProps();

  const popoverContent = isOpen ? (
    <FreeSoloPopover {...getPopoverProps()}>
      <ScrollShadow {...getListBoxWrapperProps()}>
        <Listbox {...listboxProps} />
      </ScrollShadow>
    </FreeSoloPopover>
  ) : listboxProps.state?.collection.size === 0 ? (
    <div {...getEmptyPopoverProps()} />
  ) : null;

  return (
    <Component {...getBaseProps()}>
      <Input
        {...getInputProps()}
        endContent={
          <div {...getEndContentWrapperProps()}>
            {endContent || <Button {...getClearButtonProps()}>{clearIcon}</Button>}
            <Button {...getSelectorButtonProps()}>{selectorIcon}</Button>
          </div>
        }
      />
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </Component>
  );
}) as <T extends object>(props: AutocompleteProps<T>) => ReactElement;

export default Autocomplete;
