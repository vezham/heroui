import {forwardRef} from "@v0xoss/system-rsc";
import {Tab, Tabs} from "@v0xoss/tabs";

import {Text} from "../../text/src";

import {Props} from "./types";

const StoryTab = forwardRef<"div", Props>(({title, sub_section = false, data}) => (
  <>
    {sub_section ? null : <Text content={title} variant="title" />}
    <Tabs
      aria-label="Story variants"
      color={sub_section ? "success" : "default"}
      radius={sub_section ? "full" : "none"}
      variant={sub_section ? "solid" : "underlined"}
    >
      {data.map(({id, className, label, children}) => (
        <Tab key={label} className={className} id={id} title={label}>
          {children}
        </Tab>
      ))}
    </Tabs>
  </>
));

StoryTab.displayName = "StoryTab";

export {StoryTab};
