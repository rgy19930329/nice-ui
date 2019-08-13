/**
 * @desc 组件演示 - HOCAsync
 * @author rgy
 * @date 2019-08-13 13:58:31
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
// import HOCAsync from "@components/HOCAsync";

class PreviewHOCAsync extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-h-o-c-async-wrapper">
        <h1>HOCAsync</h1>
        <div className="inner">
          {/* <HOCAsync /> */}
          高阶组件，无法演示
        </div>
      </div>
    )
  }
}

render(<PreviewHOCAsync />, document.getElementById("app"));