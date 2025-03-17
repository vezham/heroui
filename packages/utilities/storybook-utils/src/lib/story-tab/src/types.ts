import {ReactNode} from "react";

interface TabProps {
  id?: string;
  className?: string;
  label: string;
  children: ReactNode;
}

interface Props {
  title?: string;
  sub_section?: boolean;
  data: TabProps[];
}

export type {Props, Props as StoryProps, TabProps};
