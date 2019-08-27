/**
 * @desc 组件演示 - ValidateWrapper
 * @author rgy
 * @date 2019-08-27 17:42:46
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import ValidateWrapper from "@components/ValidateWrapper";

class PreviewValidateWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-validate-wrapper-wrapper">
        <h1>ValidateWrapper</h1>
        <div className="inner">
          <ValidateWrapper />
        </div>
      </div>
    )
  }
}

render(<PreviewValidateWrapper />, document.getElementById("app"));