import { HocAsync } from "anice-ui";

export default [
  {
    path: "/EditTable",
    name: "EditTable",
    component: HocAsync(() => import("./index")),
  },
];
