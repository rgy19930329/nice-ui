import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/SearchWrapper",
    name: "SearchWrapper",
    component: HOCAsync(() => import("./index")),
  },
]