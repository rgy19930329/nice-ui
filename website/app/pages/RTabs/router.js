import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/RTabs",
    name: "RTabs",
    component: HocAsync(() => import("./index")),
  },
]