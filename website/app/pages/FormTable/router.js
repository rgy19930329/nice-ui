import { HocAsync } from "anice-ui";

export default [
  {
    path: "/FormTable",
    name: "FormTable",
    component: HocAsync(() => import("./index")),
  },
];
