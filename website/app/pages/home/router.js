// import { HOCAsync } from "ky-nice-ui";
import Home from "./index";

export default [
  {
    path: "/",
    name: "首页",
    // component: HOCAsync(() => import("./index")),
    component: Home
  },
  {
    path: "/home",
    name: "首页",
    // component: HOCAsync(() => import("./index")),
    component: Home
  }
]