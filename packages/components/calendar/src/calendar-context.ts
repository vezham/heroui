import type {ContextType} from "./use-calendar-base";
import type {CalendarState, RangeCalendarState} from "@react-stately/calendar";

import {createContext} from "@v0xoss/react-utils";

export const [CalendarProvider, useCalendarContext] = createContext<
  ContextType<CalendarState | RangeCalendarState>
>({
  name: "CalendarContext",
  strict: true,
  errorMessage:
    "useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider",
});
