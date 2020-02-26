import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/withQuery",
    name: "withQuery",
    component: HOCAsync(() => import("./index")),
  },
]