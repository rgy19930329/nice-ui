import { HocAsync } from "anice-ui";

export default [
  {
    path: "/withFormInChild",
    name: "withFormInChild",
    component: HocAsync(() => import("./index")),
  },
];
