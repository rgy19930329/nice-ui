import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/ListPage",
    name: "ListPage",
    component: HOCAsync(() => import("./index")),
  },
]