import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/FormTable",
    name: "FormTable",
    component: HocAsync(() => import("./index")),
  },
];
