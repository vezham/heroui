import type {AvatarGroupProps as BaseAvatarGroupProps} from "@v0xoss/react";

import {forwardRef} from "react";
import {Avatar, useAvatarGroup, AvatarGroupProvider} from "@v0xoss/react";

export interface AvatarGroupProps extends BaseAvatarGroupProps {}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    renderCount = (count) => <Avatar name={`+${count}`} />,
    getAvatarGroupProps,
  } = useAvatarGroup({
    ref,
    ...props,
  });

  return (
    <Component {...getAvatarGroupProps()}>
      <AvatarGroupProvider value={context}>
        {clones}
        {remainingCount > 0 && renderCount(remainingCount)}
      </AvatarGroupProvider>
    </Component>
  );
});

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
