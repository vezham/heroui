import {Divider} from "@v0xoss/divider";
import {forwardRef} from "@v0xoss/system-rsc";

interface Props {
  config: string;
}

const StoryTypo = forwardRef<"div", Props>(({config}) => (
  <>
    <div className="gap-2">
      {config} | Was he a beast if music could move him so?
      <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
      <div>abcdefghijklmnopqrstuvwxyz</div>
      <div>1234567890</div>
      <div>!@#$%^&[/|(;~`:)|\]_+-=*</div>
    </div>
    <Divider className="my-4 !h-px" />
  </>
));

StoryTypo.displayName = "StoryTypo";

export {StoryTypo};
