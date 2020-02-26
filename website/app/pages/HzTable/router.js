import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/HzTable",
    name: "HzTable",
    component: HOCAsync(() => import("./index")),
  },
]