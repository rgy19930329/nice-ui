import { HocAsync } from "anice-ui";

export default [
  {
    path: "/MultiItems",
    name: "MultiItems",
    component: HocAsync(() => import("./index")),
  },
];
