import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/EnumChoice",
    name: "EnumChoice",
    component: HOCAsync(() => import("./index")),
  }
]