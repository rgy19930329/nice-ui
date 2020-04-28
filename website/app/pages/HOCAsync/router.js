import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/HocAsync",
    name: "HocAsync",
    component: HocAsync(() => import("./index")),
  },
];
