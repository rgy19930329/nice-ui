import { HOCAsync } from "ky-nice-ui";

export default {
  path: "/list",
  name: "列表页",
  component: HOCAsync(() => import("./index")),
}