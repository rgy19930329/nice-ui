import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/MultiItems",
    name: "MultiItems",
    component: HOCAsync(() => import("./index")),
  },
]