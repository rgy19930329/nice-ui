import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/MultiItems",
    name: "MultiItems",
    component: HocAsync(() => import("./index")),
  },
]