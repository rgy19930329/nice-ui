import { HocAsync } from "anice-ui";

export default [
  {
    path: "/PureField",
    name: "PureField",
    component: HocAsync(() => import("./index")),
  },
];
