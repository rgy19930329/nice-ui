import { HocAsync } from "anice-ui";

export default [
  {
    path: "/ListPage",
    name: "ListPage",
    component: HocAsync(() => import("./index")),
  },
];
