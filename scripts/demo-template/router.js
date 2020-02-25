import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/{{componentName}}",
    name: "{{componentName}}",
    component: HOCAsync(() => import("./index")),
  },
]