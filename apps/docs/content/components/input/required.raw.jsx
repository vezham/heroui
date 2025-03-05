import {Input} from "@v0xoss/react";

export default function App() {
  return (
    <Input
      isRequired
      className="max-w-xs"
      defaultValue="junior@vezham.com"
      label="Email"
      type="email"
    />
  );
}
