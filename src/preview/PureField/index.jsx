/**
 * @desc 组件演示 - PureField
 * @author rgy
 * @date 2019-09-03 13:39:31
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import PureField from "@components/PureField";
import { Form } from "antd";

@Form.create()
class PreviewPureField extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      name: "ranguangyu",
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-pure-field-wrapper">
        <h1>PureField</h1>
        <div className="inner">
          name：
          {getFieldDecorator("name")(
            <PureField transform={(value) => `【${value}】`} />
          )}
        </div>
      </div>
    )
  }
}

render(<PreviewPureField />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}