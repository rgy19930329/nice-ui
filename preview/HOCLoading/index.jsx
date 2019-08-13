/**
 * @desc 组件演示 - HOCLoading
 * @author rgy
 * @date 2019-08-13 14:05:54
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
// import HOCLoading from "@components/HOCLoading";

class PreviewHOCLoading extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-h-o-c-loading-wrapper">
        <h1>HOCLoading</h1>
        <div className="inner">
          {/* <HOCLoading /> */}
          高阶组件，无法演示
        </div>
      </div>
    )
  }
}

render(<PreviewHOCLoading />, document.getElementById("app"));