import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/ValidateWrapper",
    name: "ValidateWrapper",
    component: HOCAsync(() => import("./index")),
  },
]