/**
 * @Desc: RCheckbox - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:21:35
 */

import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import { RCheckbox, Section } from "ky-nice-ui";

@Form.create()
export default class RCheckboxPreview extends PureComponent {

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;

    return (
      <React.Fragment>
        <h1>RCheckbox</h1>

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
      </React.Fragment>
    )
  }
}
