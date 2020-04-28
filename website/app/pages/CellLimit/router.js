import { HocAsync } from "anice-ui";

export default [
  {
    path: "/CellLimit",
    name: "CellLimit",
    component: HocAsync(() => import("./index")),
  },
];
