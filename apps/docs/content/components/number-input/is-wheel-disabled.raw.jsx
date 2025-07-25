import {NumberInput} from "@v0xoss/react";

export default function App() {
  return (
    <NumberInput
      isWheelDisabled
      className="max-w-xs"
      defaultValue={1024}
      label="Amount"
      placeholder="Enter the amount"
    />
  );
}
