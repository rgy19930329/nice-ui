import { HocAsync } from "anice-ui";

export default [
  {
    path: "/RTabs",
    name: "RTabs",
    component: HocAsync(() => import("./index")),
  },
];
