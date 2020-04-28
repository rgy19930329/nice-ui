import { HocAsync } from "anice-ui";

export default [
  {
    path: "/{{componentName}}",
    name: "{{componentName}}",
    component: HocAsync(() => import("./index")),
  },
];
