import { HocAsync } from "anice-ui";

export default [
  {
    path: "/HzTable",
    name: "HzTable",
    component: HocAsync(() => import("./index")),
  },
];
