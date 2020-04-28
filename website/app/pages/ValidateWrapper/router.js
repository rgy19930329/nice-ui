import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/ValidateWrapper",
    name: "ValidateWrapper",
    component: HocAsync(() => import("./index")),
  },
]