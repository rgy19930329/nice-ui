// import { HOCAsync } from "ky-nice-ui";
import Detail from "./index";

export default {
  path: "/list/detail/:f",
  name: "系统配置-详情",
  // component: HOCAsync(() => import("./index")),
  component: Detail
}