import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/RTabs",
    name: "RTabs",
    component: HOCAsync(() => import("./index")),
  },
]