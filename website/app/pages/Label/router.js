import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/Label",
    name: "Label",
    component: HocAsync(() => import("./index")),
  },
]