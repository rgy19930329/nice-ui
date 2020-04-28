import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/withQuery",
    name: "withQuery",
    component: HocAsync(() => import("./index")),
  },
];
