import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/EditTable",
    name: "EditTable",
    component: HOCAsync(() => import("./index")),
  }
]