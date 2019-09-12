/**
 * @desc 组件演示 - Tabs
 * @author rgy
 * @date 2019-08-16 15:33:54
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import RTabs from "@components/RTabs";
import PageWrapper from "@src/components/PageWrapper";

class PreviewRTabs extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="RTabs"
        className="page-r-tabs-wrapper"
      >
        <RTabs
          defaultActiveKey="1"
          panes={[
            {
              tab: "原生表单",
              key: "1",
              content: <div>原生表单</div>
            },
            {
              tab: "配置表单",
              key: "2",
              content: <div>配置表单</div>
            }
          ]}
        />
      </PageWrapper>
    )
  }
}

render(<PreviewRTabs />, document.getElementById("app"));