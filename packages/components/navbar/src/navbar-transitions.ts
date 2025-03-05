import {Variants} from "framer-motion";
import {TRANSITION_EASINGS} from "@v0xoss/framer-utils";

export const hideOnScrollVariants: Variants = {
  visible: {
    y: 0,
    transition: {
      ease: TRANSITION_EASINGS.easeOut,
    },
  },
  hidden: {
    y: "-100%",
    transition: {
      ease: TRANSITION_EASINGS.easeIn,
    },
  },
};
