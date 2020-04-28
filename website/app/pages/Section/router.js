import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/Section",
    name: "Section",
    component: HocAsync(() => import("./index")),
  },
]