import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/HOCLoading",
    name: "HOCLoading",
    component: HOCAsync(() => import("./index")),
  },
]