import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/HOCDebounce",
    name: "HOCDebounce",
    component: HOCAsync(() => import("./index")),
  },
]