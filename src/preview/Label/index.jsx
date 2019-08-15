/**
 * @desc 页面 - PreviewLabel
 * @author rgy
 * @date 2019-08-07 14:05:18
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import Label from "@components/Label";

class PreviewLabel extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-label-wrapper">
        <h1>Label</h1>
        <div className="inner">
          <Label />
        </div>
      </div>
    )
  }
}

render(<PreviewLabel />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}