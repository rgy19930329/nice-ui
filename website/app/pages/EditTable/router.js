import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/EditTable",
    name: "EditTable",
    component: HocAsync(() => import("./index")),
  },
];
