import { HocAsync } from "anice-ui";

export default [
  {
    path: "/InlineList",
    name: "InlineList",
    component: HocAsync(() => import("./index")),
  },
];
