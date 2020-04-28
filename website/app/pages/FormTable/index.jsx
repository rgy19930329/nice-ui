/**
 * @desc 组件演示 - FormTable
 * @author rgy
 * @date 2019-08-30 18:00:28
 */

import React from "react";
import { Form, Input, Button } from "antd";
import { Section, FormTable, EnumSelect, EnumChoice } from "ky-nice-ui";
import moment from "moment";

const { RTRow, RItem } = FormTable;

@Form.create()
class FormTablePreview extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <h1>FormTable</h1>

        <Section title="测试一">
          <FormTable>
            <RTRow>
              <RItem label="测试一">sssssss</RItem>
            </RTRow>
            <RTRow>
              <RItem label="姓名">ranguangyu</RItem>
              <RItem label="性别">男</RItem>
            </RTRow>
          </FormTable>
        </Section>

        <Section title="测试二">
          <FormTable labelWidth="15%">
            <RTRow>
              <RItem label="测试一">sssssss</RItem>
            </RTRow>
            <RTRow>
              <RItem label="测试二">222222</RItem>
              <RItem label="测试二">33333333333</RItem>
              <RItem label="测试四">444444444</RItem>
            </RTRow>
          </FormTable>
        </Section>

        <Section title="员工信息">
          <FormTable form={this.props.form}>
            <RTRow>
              <RItem label="员工姓名">
                {getFieldDecorator("staffName", {
                  initialValue: "ranguangyu",
                  rules: [
                    { required: true, message: "员工姓名不能为空" },
                    { max: 5, message: "不能超过5个字符" },
                  ],
                })(<Input />)}
              </RItem>
              <RItem label="联系方式">139-xxxx-xxxx</RItem>
            </RTRow>
            <RTRow>
              <RItem label="性别">
                {getFieldDecorator("sex", {
                  initialValue: "1",
                })(
                  <EnumChoice.Radio
                    list={[
                      { code: "1", name: "男" },
                      { code: "2", name: "女" },
                    ]}
                  />
                )}
              </RItem>
              <RItem label="部门">
                {getFieldDecorator("dept")(
                  <EnumSelect
                    list={[
                      "前端研发",
                      "后端研发",
                      "测试",
                      "运维",
                      "产品经理",
                      "市场营销",
                    ]}
                  />
                )}
              </RItem>
            </RTRow>
            <RTRow>
              <RItem label="个人简介">
                {getFieldDecorator("remark", {
                  rules: [
                    { required: true, message: "个人简介不能为空" },
                    { max: 200, message: "不能超过200个字符" },
                  ],
                })(<Input.TextArea />)}
              </RItem>
            </RTRow>
            <RTRow>
              <RItem label="当前时间">
                {new Date()} <br />
                {moment(new Date()).format("YYYY-MM-DD HH:mm")}
              </RItem>
            </RTRow>
          </FormTable>

          <div>
            <Button
              type="primary"
              onClick={() => {
                this.props.form.validateFieldsAndScroll((errors, values) => {
                  if (!!errors) {
                    console.log("Error in Form!!");
                    return;
                  }
                  alert(JSON.stringify(values));
                });
              }}
              style={{ marginTop: 20 }}
            >
              提交
            </Button>
          </div>
        </Section>
      </React.Fragment>
    );
  }
}

export default FormTablePreview;
