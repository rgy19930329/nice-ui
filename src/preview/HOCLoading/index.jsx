/**
 * @desc 组件演示 - HOCLoading
 * @author rgy
 * @date 2019-08-13 14:05:54
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
// import HOCLoading from "@components/HOCLoading";
import PageWrapper from "@src/components/PageWrapper";

class PreviewHOCLoading extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="HOCLoading"
        className="page-h-o-c-loading-wrapper"
      >
        {/* <HOCLoading /> */}
        高阶组件，无法演示
      </PageWrapper>
    )
  }
}

render(<PreviewHOCLoading />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}