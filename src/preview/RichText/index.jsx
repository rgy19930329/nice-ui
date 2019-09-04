/**
 * @desc 组件演示 - RichText
 * @author rgy
 * @date 2019-08-12 10:08:10
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import RichText from "@components/RichText";
import PageWrapper from "@src/components/PageWrapper";

class PreviewRichText extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="RichText"
        className="page-rich-text-wrapper"
      >
        <RichText />
      </PageWrapper>
    )
  }
}

render(<PreviewRichText />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}