import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/RichText",
    name: "RichText",
    component: HOCAsync(() => import("./index")),
  },
]