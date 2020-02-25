import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/EnumSelect",
    name: "EnumSelect",
    component: HOCAsync(() => import("./index")),
  }
]