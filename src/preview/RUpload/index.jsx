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
import { Form, Button, Input } from "antd";

@Form.create()
class PreviewRUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      values: {},
    }
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
          {getFieldDecorator("test", {
            initialValue: [
              {
                fileId: "500000201904076745",
                fileName: "ranguangyu.txt",
              }
            ]
          })(
            <RUpload
              transformFrom={(file) => {
                return {
                  id: file.fileId,
                  name: file.fileName,
                  url: `/yapi/download?id=${file.fileId}`,
                }
              }}
            />
          )}
        </Section>

        <div>
          <Button onClick={() => {
            let values = this.props.form.getFieldsValue();
            this.setState({ values });
            console.log(values);
          }}>submit</Button>
        </div>

        <Section title="form 表单 结果展示">
          <Input.TextArea
            autosize
            value={JSON.stringify(this.state.values, null, 4)}
          />
        </Section>
      </PageWrapper>
    )
  }
}

render(<PreviewRUpload />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}