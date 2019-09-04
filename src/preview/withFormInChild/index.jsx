/**
 * @desc 组件演示 - withFormInChild
 * @author rgy
 * @date 2019-09-02 17:13:03
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import withFormInChild from "@components/withFormInChild";
import ValidateWrapper from "@components/ValidateWrapper";
import { Form, Input } from "antd";
import PageWrapper from "@src/components/PageWrapper";

@Form.create()
@withFormInChild
class PreviewwithFormInChild extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageWrapper
        comp="withFormInChild"
        className="page-with-form-in-child-wrapper"
      >
        <ValidateWrapper>
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: "姓名不能为空" },
            ]
          })(
            <Input
              placeholder="请输入姓名"
              style={{ width: 200 }}
            />
          )}
        </ValidateWrapper>
      </PageWrapper>
    )
  }
}

render(<PreviewwithFormInChild />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}