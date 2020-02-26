import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/InlineList",
    name: "InlineList",
    component: HOCAsync(() => import("./index")),
  },
]