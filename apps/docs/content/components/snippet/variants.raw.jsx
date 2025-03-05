import {Snippet} from "@v0xoss/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">npm install @v0xoss/react</Snippet>
      <Snippet color="warning" variant="flat">
        npm install @v0xoss/react
      </Snippet>
      <Snippet color="primary" variant="solid">
        npm install @v0xoss/react
      </Snippet>
      <Snippet color="secondary" variant="shadow">
        npm install @v0xoss/react
      </Snippet>
    </div>
  );
}
