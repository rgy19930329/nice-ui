import { HocAsync } from "anice-ui";

export default [
  {
    path: "/Label",
    name: "Label",
    component: HocAsync(() => import("./index")),
  },
];
