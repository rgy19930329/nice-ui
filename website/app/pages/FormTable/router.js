import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/FormTable",
    name: "FormTable",
    component: HOCAsync(() => import("./index")),
  }
]