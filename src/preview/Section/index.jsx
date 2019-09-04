/**
 * @desc 组件演示 - Section
 * @author rgy
 * @date 2019-08-13 23:28:53
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import Section from "@components/Section";
import PageWrapper from "@src/components/PageWrapper";

class PreviewSection extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="Section"
        className="page-section-wrapper"
      >
        <Section
          title="Section Test"
          titleSlot={<a>关闭</a>}
        >
          xxxxxxxxxxxxxxxxxxx
          </Section>
      </PageWrapper>
    )
  }
}

render(<PreviewSection />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}