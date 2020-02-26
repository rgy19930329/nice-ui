/**
 * @Desc: PureField - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:19:08
 */

import React, { PureComponent } from "react";
import { Form } from "antd";
import { PureField, Section } from "ky-nice-ui";

@Form.create()
export default class PureFieldPreview extends PureComponent {

  componentDidMount() {
    this.props.form.setFieldsValue({
      name: "ranguangyu",
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <h1>PureField</h1>

        <Section title="测试一">
          name:
          {getFieldDecorator("name")(
            <PureField transform={(value) => `【${value}】`} />
          )}
        </Section>
      </React.Fragment>
    )
  }
}
