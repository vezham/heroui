import type {ContextType} from "./use-button-group";

import {createContext} from "@v0xoss/react-utils";

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<ContextType>({
  name: "ButtonGroupContext",
  strict: false,
});
