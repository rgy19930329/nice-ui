import { HocAsync } from "anice-ui";

export default [
  {
    path: "/HocDebounce",
    name: "HocDebounce",
    component: HocAsync(() => import("./index")),
  },
];
