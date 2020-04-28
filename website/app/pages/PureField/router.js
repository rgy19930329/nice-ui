import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/PureField",
    name: "PureField",
    component: HocAsync(() => import("./index")),
  },
];
