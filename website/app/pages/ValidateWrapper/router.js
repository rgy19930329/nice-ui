import { HocAsync } from "anice-ui";

export default [
  {
    path: "/ValidateWrapper",
    name: "ValidateWrapper",
    component: HocAsync(() => import("./index")),
  },
];
