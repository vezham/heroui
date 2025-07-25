import {Breadcrumbs, BreadcrumbItem} from "@v0xoss/react";

export default function App() {
  return (
    <Breadcrumbs isDisabled>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Music</BreadcrumbItem>
      <BreadcrumbItem>Artist</BreadcrumbItem>
      <BreadcrumbItem>Album</BreadcrumbItem>
      <BreadcrumbItem>Song</BreadcrumbItem>
    </Breadcrumbs>
  );
}
