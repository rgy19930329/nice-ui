import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/CellLimit",
    name: "CellLimit",
    component: HOCAsync(() => import("./index")),
  }
]