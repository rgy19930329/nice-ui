import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/withFormInChild",
    name: "withFormInChild",
    component: HocAsync(() => import("./index")),
  },
];
