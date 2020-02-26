import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/RUpload",
    name: "RUpload",
    component: HOCAsync(() => import("./index")),
  },
]