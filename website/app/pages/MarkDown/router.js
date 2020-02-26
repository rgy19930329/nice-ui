import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/MarkDown",
    name: "MarkDown",
    component: HOCAsync(() => import("./index")),
  },
]