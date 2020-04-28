import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/RichText",
    name: "RichText",
    component: HocAsync(() => import("./index")),
  },
]