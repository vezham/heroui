import {TimeInput} from "@v0xoss/react";
import {Time} from "@internationalized/date";

export default function App() {
  return <TimeInput defaultValue={new Time(8)} minValue={new Time(9)} />;
}
