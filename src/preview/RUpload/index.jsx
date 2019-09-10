/**
 * @desc 组件演示 - RUpload
 * @author rgy
 * @date 2019-09-10 14:53:45
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import RUpload from "@components/RUpload";
import PageWrapper from "@src/components/PageWrapper";
import Section from "@components/Section";
import { Form } from "antd";

@Form.create()
class PreviewRUpload extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form; 
    return (
      <PageWrapper
        comp="RUpload"
        className="page-r-upload-wrapper"
      >
        <Section title="测试一">
          {getFieldDecorator("test1", {
            initialValue: [
              {
                id: "asdfasdfadfjfweifj112dsfd",
                name: "ranguangyu.txt",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
            ]
          })(
            <RUpload

            />
          )}
        </Section>
        {/* <Section title="测试二">
          <RUpload />
        </Section> */}
      </PageWrapper>
    )
  }
}

render(<PreviewRUpload />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}