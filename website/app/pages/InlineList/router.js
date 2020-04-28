import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/InlineList",
    name: "InlineList",
    component: HocAsync(() => import("./index")),
  },
]