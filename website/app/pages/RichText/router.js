import { HocAsync } from "anice-ui";

export default [
  {
    path: "/RichText",
    name: "RichText",
    component: HocAsync(() => import("./index")),
  },
];
