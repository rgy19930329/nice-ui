import { HocAsync } from "anice-ui";

export default [
  {
    path: "/HocAsync",
    name: "HocAsync",
    component: HocAsync(() => import("./index")),
  },
];
