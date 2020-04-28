/**
 * @Desc: RUpload - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:30:39
 */

import React, { PureComponent } from "react";
import { Form, Spin, Icon } from "antd";
import { RUpload, Section } from "anice-ui";

@Form.create()
class RUploadPreview extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <React.Fragment>
        <h1>RUpload</h1>

        <Section title="测试 数据搜集">
          {getFieldDecorator("test", {
            initialValue: [
              {
                fileId: "500000201904076745",
                fileName: "ranguangyu.txt",
              },
            ],
          })(
            <RUpload
              uploadProps={{
                action: "/yapi/upload",
                headers: {
                  Authorization: "5cc8019d300000980a055e76",
                },
              }}
              transformFrom={(file) => {
                return {
                  id: file.fileId,
                  name: file.fileName,
                  url: `/yapi/download?id=${file.fileId}`,
                };
              }}
            />
          )}
        </Section>

        <Section title="测试 triggerArea">
          {getFieldDecorator("test2")(
            <RUpload
              transformFrom={(file) => {
                return {
                  id: file.fileId,
                  name: file.fileName,
                  url: `/yapi/download?id=${file.fileId}`,
                };
              }}
              triggerArea={(loading) => (
                <div>
                  <a style={{ marginRight: 20 }}>上传</a>
                  <span style={{ marginRight: 10 }}>请选择要上传的文件</span>
                  <Spin
                    indicator={<Icon type="loading" spin />}
                    spinning={loading}
                  />
                </div>
              )}
            />
          )}
        </Section>

        <Section title="测试 readOnly">
          {getFieldDecorator("test3", {
            initialValue: [
              {
                fileId: "500000201904076749",
                fileName: "ranguangyu.docx",
              },
            ],
          })(
            <RUpload
              transformFrom={(file) => {
                return {
                  id: file.fileId,
                  name: file.fileName,
                  url: `/yapi/download?id=${file.fileId}`,
                };
              }}
              readOnly
            />
          )}
        </Section>
      </React.Fragment>
    );
  }
}

export default RUploadPreview;
