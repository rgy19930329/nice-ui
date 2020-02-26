import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/withFormInChild",
    name: "withFormInChild",
    component: HOCAsync(() => import("./index")),
  },
]