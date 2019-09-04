/**
 * @desc 组件演示 - MarkDown
 * @author rgy
 * @date 2019-09-04 13:59:17
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import MarkDown from "@components/MarkDown";
import PageWrapper from "@src/components/PageWrapper";

class PreviewMarkDown extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="MarkDown"
        className="page-cell-limit-wrapper"
      >
        <MarkDown>
          ```js
            var a = 123;
            console.log(a);
          ```
        </MarkDown>
      </PageWrapper>
    )
  }
}

render(<PreviewMarkDown />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}