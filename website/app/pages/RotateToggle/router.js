import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/RotateToggle",
    name: "RotateToggle",
    component: HocAsync(() => import("./index")),
  },
]