import {Input} from "@v0xoss/react";

export default function App() {
  return (
    <Input
      isClearable
      className="max-w-xs"
      defaultValue="junior@vezham.com"
      label="Email"
      placeholder="Enter your email"
      type="email"
      variant="bordered"
      // eslint-disable-next-line no-console
      onClear={() => console.log("input cleared")}
    />
  );
}
