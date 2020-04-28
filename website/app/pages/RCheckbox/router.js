import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/RCheckbox",
    name: "RCheckbox",
    component: HocAsync(() => import("./index")),
  },
];
