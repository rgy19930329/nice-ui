import { HocAsync } from "anice-ui";

export default [
  {
    path: "/RUpload",
    name: "RUpload",
    component: HocAsync(() => import("./index")),
  },
];
