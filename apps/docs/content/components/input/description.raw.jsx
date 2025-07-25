import {Input} from "@v0xoss/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior@v0xoss.com"
      description="We'll never share your email with anyone else."
      label="Email"
      type="email"
    />
  );
}
