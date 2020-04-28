import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/{{componentName}}",
    name: "{{componentName}}",
    component: HocAsync(() => import("./index")),
  },
]