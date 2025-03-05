import {Input} from "@v0xoss/react";

export default function App() {
  return (
    <Input
      isReadOnly
      className="max-w-xs"
      defaultValue="junior@vezham.com"
      label="Email"
      type="email"
      variant="bordered"
    />
  );
}
