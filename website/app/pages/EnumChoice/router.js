import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/EnumChoice",
    name: "EnumChoice",
    component: HocAsync(() => import("./index")),
  },
];
