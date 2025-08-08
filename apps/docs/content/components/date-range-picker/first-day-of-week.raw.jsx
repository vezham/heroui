import {DateRangePicker} from "@vx-oss/react";

export default function App() {
  return (
    <DateRangePicker
      className="max-w-xs"
      description="Please enter your stay duration"
      firstDayOfWeek="mon"
      label="Stay duration"
    />
  );
}
