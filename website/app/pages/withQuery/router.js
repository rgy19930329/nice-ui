import { HocAsync } from "anice-ui";

export default [
  {
    path: "/withQuery",
    name: "withQuery",
    component: HocAsync(() => import("./index")),
  },
];
