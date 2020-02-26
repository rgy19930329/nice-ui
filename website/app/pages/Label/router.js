import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/Label",
    name: "Label",
    component: HOCAsync(() => import("./index")),
  },
]