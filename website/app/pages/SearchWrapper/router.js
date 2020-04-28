import { HocAsync } from "anice-ui";

export default [
  {
    path: "/SearchWrapper",
    name: "SearchWrapper",
    component: HocAsync(() => import("./index")),
  },
];
