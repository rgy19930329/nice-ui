import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/",
    name: "首页",
    component: HOCAsync(() => import("./index")),
  },
  {
    path: "/home",
    name: "首页",
    component: HOCAsync(() => import("./index")),
  }
]