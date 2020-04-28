import { HocAsync } from "anice-ui";

export default [
  {
    path: "/HocLoading",
    name: "HocLoading",
    component: HocAsync(() => import("./index")),
  },
];
