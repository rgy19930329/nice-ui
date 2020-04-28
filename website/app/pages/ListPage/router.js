import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/ListPage",
    name: "ListPage",
    component: HocAsync(() => import("./index")),
  },
]