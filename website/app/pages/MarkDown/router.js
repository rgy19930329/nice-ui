import { HocAsync } from "anice-ui";

export default [
  {
    path: "/MarkDown",
    name: "MarkDown",
    component: HocAsync(() => import("./index")),
  },
];
