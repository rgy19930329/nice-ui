import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/CellLimit",
    name: "CellLimit",
    component: HocAsync(() => import("./index")),
  }
]