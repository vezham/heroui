import {User, Link} from "@v0xoss/react";

export default function App() {
  return (
    <User
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
      }}
      description={
        <Link isExternal href="https://x.com/jrgarciadev" size="sm">
          @jrgarciadev
        </Link>
      }
      name="Junior Garcia"
    />
  );
}
