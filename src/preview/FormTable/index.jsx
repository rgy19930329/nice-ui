/**
 * @desc 组件演示 - FormTable
 * @author rgy
 * @date 2019-08-30 18:00:28
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { Form, Input, Button } from "antd";
import FormTable from "@components/FormTable";
import Section from "@components/Section";
import EnumSelect from "@components/EnumSelect";
import EnumChoice from "@components/EnumChoice";

const RTRow = FormTable.RTRow;
const RItem = FormTable.RItem;

@Form.create()
class PreviewFormTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-form-table-wrapper">
        <h1>FormTable</h1>
        <div className="inner">
          <FormTable>
            <RTRow>
              <RItem label="测试一">sssssss</RItem>
            </RTRow>
            <RTRow>
              <RItem label="姓名">ranguangyu</RItem>
              <RItem label="性别">男</RItem>
            </RTRow>
          </FormTable>

          <br></br>

          <Section title="员工信息">
            <FormTable form={this.props.form}>
              <RTRow>
                <RItem label="员工姓名">
                  {getFieldDecorator("staffName", {
                    initialValue: "ranguangyu",
                    rules: [
                      { required: true, message: "员工姓名不能为空" },
                      { max: 5, message: "不能超过5个字符" }
                    ]
                  })(
                    <Input />
                  )}
                </RItem>
                <RItem label="联系方式">
                  139-xxxx-xxxx
                </RItem>
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
                      list={["前端研发", "后端研发", "测试", "运维", "产品经理", "市场营销"]}
                    />
                  )}
                </RItem>
              </RTRow>
              <RTRow>
                <RItem label="个人简介">
                  {getFieldDecorator("ramark", {
                    rules: [
                      { required: true, message: "个人简介不能为空" },
                      { max: 200, message: "不能超过200个字符" }
                    ]
                  })(
                    <Input.TextArea />
                  )}
                </RItem>
              </RTRow>
            </FormTable>

            <div>
              <Button
                type="primary"
                onClick={() => {
                  const values = this.props.form.getFieldsValue();
                  alert(JSON.stringify(values));
                }}
                style={{marginTop: 20}}
              >
                提交
              </Button>
            </div>
          </Section>
        </div>
      </div>
    )
  }
}

render(<PreviewFormTable />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}