import { HocAsync } from "anice-ui";

export default [
  {
    path: "/Section",
    name: "Section",
    component: HocAsync(() => import("./index")),
  },
];
