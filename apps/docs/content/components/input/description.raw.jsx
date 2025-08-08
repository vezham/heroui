import {Input} from "@vx-oss/react";

export default function App() {
  return (
    <Input
      className="max-w-xs"
      defaultValue="junior@vx-oss.com"
      description="We'll never share your email with anyone else."
      label="Email"
      type="email"
    />
  );
}
