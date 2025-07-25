import {Snippet} from "@v0xoss/react";

export default function App() {
  return (
    <Snippet
      tooltipProps={{
        color: "foreground",
        content: "Copy this snippet",
        disableAnimation: true,
        placement: "right",
        closeDelay: 0,
      }}
    >
      npm install @v0xoss/react
    </Snippet>
  );
}
