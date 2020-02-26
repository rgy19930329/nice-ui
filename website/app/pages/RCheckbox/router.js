import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/RCheckbox",
    name: "RCheckbox",
    component: HOCAsync(() => import("./index")),
  },
]