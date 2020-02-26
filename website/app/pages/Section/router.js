import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/Section",
    name: "Section",
    component: HOCAsync(() => import("./index")),
  },
]