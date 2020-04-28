import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/MarkDown",
    name: "MarkDown",
    component: HocAsync(() => import("./index")),
  },
]