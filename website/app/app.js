import "./global.less";
import React from "react";
import { render } from "react-dom";
import App from "./pages/index";

import "antd/dist/antd.css";
import "anice-ui/anice-ui.css";

render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
