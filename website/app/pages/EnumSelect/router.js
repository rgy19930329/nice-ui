import { HocAsync } from "anice-ui";

export default [
  {
    path: "/EnumSelect",
    name: "EnumSelect",
    component: HocAsync(() => import("./index")),
  },
];
