import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/EnumSelect",
    name: "EnumSelect",
    component: HocAsync(() => import("./index")),
  },
];
