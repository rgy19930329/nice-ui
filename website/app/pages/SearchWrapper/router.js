import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/SearchWrapper",
    name: "SearchWrapper",
    component: HocAsync(() => import("./index")),
  },
]