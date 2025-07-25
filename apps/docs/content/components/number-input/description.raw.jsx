import {NumberInput} from "@v0xoss/react";

export default function App() {
  return (
    <NumberInput
      className="max-w-xs"
      defaultValue={1024}
      description="Enter the amount"
      label="Amount"
    />
  );
}
