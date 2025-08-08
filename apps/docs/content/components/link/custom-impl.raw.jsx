import {forwardRef} from "react";
import {LinkIcon} from "@vx-oss/shared-icons";
import {linkAnchorClasses} from "@vx-oss/theme";
import {useLink} from "@vx-oss/react";

const MyLink = forwardRef((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink({
    ...props,
    ref,
  });

  return (
    <Component {...getLinkProps()}>
      <>
        {children}
        {showAnchorIcon && anchorIcon}
      </>
    </Component>
  );
});

MyLink.displayName = "MyLink";

export default MyLink;
