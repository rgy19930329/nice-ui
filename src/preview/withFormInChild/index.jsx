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
      <div className="pagewith-form-in-child-wrapper">
        <h1>withFormInChild</h1>
        <div className="inner">
          <ValidateWrapper>
            {getFieldDecorator("sex", {
              rules: [
                { required: true, message: "性别不能为空" },
              ]
            })(
              <Input
                placeholder="请输入性别"
                style={{ width: 200 }}
              />
            )}
          </ValidateWrapper>
        </div>
      </div>
    )
  }
}

render(<PreviewwithFormInChild />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}