/**
 * @desc 组件演示 - InlineList
 * @author rgy
 * @date 2019-09-05 15:41:56
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import InlineList from "@components/InlineList";
import PageWrapper from "@src/components/PageWrapper";
import Section from "@components/Section";

class PreviewInlineList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="InlineList"
        className="page-inline-list-wrapper"
      >
        <Section title="测试一">
          <InlineList
            list={["发文", "收文-会议", "收文-案件"]}
          />
        </Section>

        <Section title="测试二">
          <InlineList
            list={[
              { code: "01", name: "发文" },
              { code: "02", name: "收文-会议" },
              { code: "03", name: "收文-案件" },
            ]}
            split={<a> | </a>}
            render={item => `${item.code}.${item.name}` }
          />
        </Section>
        
      </PageWrapper>
    )
  }
}

render(<PreviewInlineList />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}