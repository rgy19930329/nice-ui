/**
 * @desc 组件演示 - MultiItems
 * @author rgy
 * @date 2019-10-09 09:09:52
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import MultiItems from "@components/MultiItems";
import PageWrapper from "@src/components/PageWrapper";
import withLocale from "@src/components/withLocale";
import Section from "@components/Section";
import { Form, Input } from "antd";
import ConnectedModal from "./components/ConnectedModal";
import UserSelect from "./components/UserSelect";

@Form.create()
@withLocale
class PreviewMultiItems extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      test1: [
        "1111",
        "2222",
        "3333",
      ],
      test2: [
        { code: "1001", name: "AAAA" },
        { code: "1002", name: "BBBB" },
        { code: "1003", name: "CCCC" },
      ]
    });
  }

  render() {
    const { getFieldDecorator, getFieldsValue, setFieldsValue } = this.props.form;

    return (
      <PageWrapper
        comp="MultiItems"
        className="page-multi-items-wrapper"
      >
        <Section title="测试1">
          {getFieldDecorator("test1")(
            <MultiItems closable={false} />
          )}
        </Section>

        <Section title="测试2">
          {getFieldDecorator("test2")(
            <MultiItems />
          )}
        </Section>

        <Section title="测试3">
          {getFieldDecorator("test3")(
            <MultiItems
              placeholder="测试3"
              onTrigger={() => {
                this.connectRef.open();
              }}
            />
          )}
          <ConnectedModal
            setRef={connectRef => this.connectRef = connectRef}
            onChange={(value) => {
              value = value.map(item => {
                return {
                  code: item.bid,
                  name: item.name,
                }
              });
              setFieldsValue({
                test3: value,
              });
            }}
          />
        </Section>

        <Section title="测试4">
          {getFieldDecorator("test4")(
            <UserSelect />
          )}
        </Section>

        <Section title="打印结果">
          <Input.TextArea autosize value={JSON.stringify(getFieldsValue(), null, 4)} />
        </Section>
      </PageWrapper>
    )
  }
}

render(<PreviewMultiItems />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}