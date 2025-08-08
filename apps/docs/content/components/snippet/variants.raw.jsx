import {Snippet} from "@vx-oss/react";

export default function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Snippet variant="bordered">npm install @vx-oss/react</Snippet>
      <Snippet color="warning" variant="flat">
        npm install @vx-oss/react
      </Snippet>
      <Snippet color="primary" variant="solid">
        npm install @vx-oss/react
      </Snippet>
      <Snippet color="secondary" variant="shadow">
        npm install @vx-oss/react
      </Snippet>
    </div>
  );
}
