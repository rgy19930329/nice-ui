import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/",
    name: "首页",
    component: HocAsync(() => import("./index")),
  },
  {
    path: "/home",
    name: "首页",
    component: HocAsync(() => import("./index")),
  }
]