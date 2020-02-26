import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/HOCAsync",
    name: "HOCAsync",
    component: HOCAsync(() => import("./index")),
  },
]