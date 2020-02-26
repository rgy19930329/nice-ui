import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/RotateToggle",
    name: "RotateToggle",
    component: HOCAsync(() => import("./index")),
  },
]