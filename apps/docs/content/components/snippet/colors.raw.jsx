import {Snippet} from "@v0xoss/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet color="default">npm install @v0xoss/react</Snippet>
      <Snippet color="primary">npm install @v0xoss/react</Snippet>
      <Snippet color="secondary">npm install @v0xoss/react</Snippet>
      <Snippet color="success">npm install @v0xoss/react</Snippet>
      <Snippet color="warning">npm install @v0xoss/react</Snippet>
      <Snippet color="danger">npm install @v0xoss/react</Snippet>
    </div>
  );
}
