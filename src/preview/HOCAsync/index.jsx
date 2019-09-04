/**
 * @desc 组件演示 - HOCAsync
 * @author rgy
 * @date 2019-08-13 13:58:31
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
// import HOCAsync from "@components/HOCAsync";
import PageWrapper from "@src/components/PageWrapper";

class PreviewHOCAsync extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="HOCAsync"
        className="page-h-o-c-async-wrapper"
      >
        {/* <HOCAsync /> */}
        高阶组件，无法演示
      </PageWrapper>
    )
  }
}

render(<PreviewHOCAsync />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}