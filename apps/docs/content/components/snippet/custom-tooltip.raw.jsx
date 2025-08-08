import {Snippet} from "@vx-oss/react";

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
      npm install @vx-oss/react
    </Snippet>
  );
}
