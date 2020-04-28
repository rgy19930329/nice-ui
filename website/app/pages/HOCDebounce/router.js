import { HocAsync } from "ky-nice-ui";

export default [
  {
    path: "/HocDebounce",
    name: "HocDebounce",
    component: HocAsync(() => import("./index")),
  },
];
