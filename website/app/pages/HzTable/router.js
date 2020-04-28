import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/HzTable",
    name: "HzTable",
    component: HocAsync(() => import("./index")),
  },
];
