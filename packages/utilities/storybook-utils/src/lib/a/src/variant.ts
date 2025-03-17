import {VariantProps, tv} from "@v0xoss/theme";

const tva = tv({
  slots: {
    base: "va",
  },
  variants: {
    variant: {
      solid: "",
      bordered: "",
      light: "",
    },
    border: {
      none: "border-0 border-solid",
      sm: "border border-solid",
      md: "border-2 border-solid",
      lg: "border-4 border-solid",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
    blur: {
      none: "blur-none",
      sm: "blur-sm",
      md: "blur-md",
      lg: "blur-lg",
    },
  },
  defaultVariants: {
    variant: "solid",
    border: "sm",
    radius: "lg",
    shadow: "none",
    blur: "none",
  },
});

type tvProps = VariantProps<typeof tva>;
type tvSlots = keyof ReturnType<typeof tva>;

export {tva};
export type {tvProps, tvSlots};
