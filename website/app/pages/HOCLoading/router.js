import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/HocLoading",
    name: "HocLoading",
    component: HocAsync(() => import("./index")),
  },
];
