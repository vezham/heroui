import {Chip} from "@v0xoss/chip";
import {Divider} from "@v0xoss/divider";
import {forwardRef} from "@v0xoss/system-rsc";

import {Props, useProps} from "./types";
import {getColor, getVariant} from "./utils";

const StoryStatus = forwardRef<"div", Props>((props, ref) => {
  const {Component, getBaseProps, usecase, dev, storybook, tests} = useProps({
    ...props,
    ref,
  });

  return (
    <Component {...getBaseProps()}>
      <div className="flex gap-2 ">
        <Chip color={getColor(usecase)} radius="full" size="md" variant={getVariant(usecase)}>
          UI/UX (PM)
        </Chip>
        <Chip color={getColor(dev)} radius="full" size="md" variant={getVariant(dev)}>
          Development
        </Chip>
        <Chip color={getColor(storybook)} radius="full" size="md" variant={getVariant(storybook)}>
          Storybook
        </Chip>
        <Chip color={getColor(tests)} radius="full" size="md" variant={getVariant(tests)}>
          Testing
        </Chip>
      </div>
      <Divider className="my-4 !h-px" />
    </Component>
  );
});

StoryStatus.displayName = "StoryStatus";

export {StoryStatus};
