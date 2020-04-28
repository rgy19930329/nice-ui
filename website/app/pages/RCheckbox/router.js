import { HocAsync } from "anice-ui";

export default [
  {
    path: "/RCheckbox",
    name: "RCheckbox",
    component: HocAsync(() => import("./index")),
  },
];
