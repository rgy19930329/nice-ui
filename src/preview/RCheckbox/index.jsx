/**
 * @desc 组件演示 - RCheckbox
 * @author rgy
 * @date 2019-09-17 16:43:41
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import RCheckbox from "@components/RCheckbox";
import Section from "@components/Section";
import PageWrapper from "@src/components/PageWrapper";
import { Form, Input } from "antd";

@Form.create()
class PreviewRCheckbox extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form; 
    return (
      <PageWrapper
        comp="RCheckbox"
        className="page-r-checkbox-wrapper"
      >
        <Section title="测试 未映射">
          {getFieldDecorator("isAudit")(
            <RCheckbox>
              是否开启审核
            </RCheckbox>
          )}
        </Section>

        <Section title="测试 映射">
          {getFieldDecorator("isAudit2")(
            <RCheckbox
              map={{
                "1": true,
                "0": false,
              }}
            >
              是否开启审核
            </RCheckbox>
          )}
        </Section>
        
        <Section title="打印结果">
          <Input.TextArea autosize value={JSON.stringify(getFieldsValue(), null, 4)} />
        </Section>
      </PageWrapper>
    )
  }
}

render(<PreviewRCheckbox />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}