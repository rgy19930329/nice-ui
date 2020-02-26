import { HOCAsync } from "ky-nice-ui";

export default [
  {
    path: "/PureField",
    name: "PureField",
    component: HOCAsync(() => import("./index")),
  },
]