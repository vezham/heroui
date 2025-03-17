import {ReactRef, useDOMRef} from "@v0xoss/react-utils";
import {PropGetter, v0xdsHTMLProps} from "@v0xoss/system-rsc";

type status = "todo" | "dev" | "review" | "completed";

interface Props extends v0xdsHTMLProps<"div"> {
  ref?: ReactRef<HTMLDivElement | null>;
  // classNames?: SlotsToClasses<tvSlots>
  usecase: status | "poc";
  dev: status;
  storybook: status;
  tests: status;
}

const useProps = (props: Props) => {
  const {
    as,
    id,
    ref,
    children,
    className,
    // classNames,
    usecase,
    dev,
    storybook,
    tests,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  // const slots = tva(variantProps)

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
    className,
    ...otherProps,
  });

  return {
    Component,
    domRef,
    // slots,
    // classNames,
    children,
    getBaseProps,

    // otherProps
    usecase,
    dev,
    storybook,
    tests,
  };
};

export {useProps};
export type {Props};
