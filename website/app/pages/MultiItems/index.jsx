/**
 * @Desc: MultiItems - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:04:25
 */

import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import { MultiItems, Section } from "anice-ui";

@Form.create()
class MultiItemsPreview extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      test1: ["1111", "2222", "3333"],
      test2: [
        { code: "1001", name: "AAAA" },
        { code: "1002", name: "BBBB" },
        { code: "1003", name: "CCCC" },
      ],
      test5: ["4444", "5555", "6666"],
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
    } = this.props.form;

    return (
      <React.Fragment>
        <h1>MultiItems</h1>

        <Section title="测试一">
          {getFieldDecorator("test1")(<MultiItems closable={false} />)}
        </Section>

        <Section title="测试二">
          {getFieldDecorator("test2")(<MultiItems />)}
        </Section>

        <Section title="测试三">
          {getFieldDecorator("test5")(
            <MultiItems
              readOnly
              onItemClick={(item) => {
                window.open(`https://www.baidu.com/?id=${item}`, "_blank");
              }}
            />
          )}
        </Section>
      </React.Fragment>
    );
  }
}

export default MultiItemsPreview;
