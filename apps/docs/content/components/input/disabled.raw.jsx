import {Input} from "@vx-oss/react";

export default function App() {
  return (
    <Input
      isDisabled
      className="max-w-xs"
      defaultValue="junior@vx-oss.com"
      label="Email"
      type="email"
    />
  );
}
