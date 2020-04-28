import { HocAsync } from "anice-ui";

export default [
  {
    path: "/RotateToggle",
    name: "RotateToggle",
    component: HocAsync(() => import("./index")),
  },
];
