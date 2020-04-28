import { HocAsync } from "anice-ui";

export default [
  {
    path: "/EnumChoice",
    name: "EnumChoice",
    component: HocAsync(() => import("./index")),
  },
];
