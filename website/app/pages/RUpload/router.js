import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/RUpload",
    name: "RUpload",
    component: HocAsync(() => import("./index")),
  },
]