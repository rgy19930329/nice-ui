/**
 * @Desc: SearchWrapper - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:47:24
 */

import React, { PureComponent } from "react";
import { Form, Row, Col, Input, InputNumber, DatePicker } from "antd";
import { SearchWrapper, Section, EnumSelect, withFormInChild } from "ky-nice-ui";
import { fetch } from "ky-nice-utils";

const { RangePicker } = DatePicker;

@Form.create()
@withFormInChild
export default class SearchWrapperPreview extends PureComponent {

  /**
   * 查询
   */
  onSearch = async (query) => {
    console.log(query);
    let result = await fetch("/yapi/test", query);
    console.log(result);
  }

  searchs = [
    [
      {
        label: "流水号",
        fname: "bid",
        field: (
          <Input />
        ),
      },
      {
        label: "年龄",
        fname: "age",
        field: (
          <InputNumber style={{ width: "100%" }} />
        ),
      },
      {
        label: "部门",
        fname: "dept",
        field: (
          <EnumSelect
            placeholder="请选择"
            list={[
              "研发部",
              "市场部",
              "客服部",
              "公关部",
              "办公室"
            ]}
          />
        )
      }
    ],
    [
      {
        label: "创建时间",
        fname: "duringDate",
        field: (
          <RangePicker style={{width: "100%"}} />
        )
      },
      {
        label: "状态",
        fname: "status",
        field: (
          <EnumSelect
            placeholder="请选择"
            list={[
              "草稿",
              "代审",
              "驳回",
              "办结"
            ]}
          />
        )
      }
    ]
  ]

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <React.Fragment>
        <h1>SearchWrapper</h1>

        <Section title="测试一">
          <SearchWrapper
            onSearch={this.onSearch}
            setRef={(swRef) => this.swRef = swRef}
          >
            <Row>
              <Col span={8}>
                <Form.Item label="name" {...formItemLayout}>
                  {getFieldDecorator("name")(
                    <Input onPressEnter={this.swRef && this.swRef.onSearch} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="age" {...formItemLayout}>
                  {getFieldDecorator("age")(
                    <InputNumber style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="dept" {...formItemLayout}>
                  {getFieldDecorator("dept")(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="sex" {...formItemLayout}>
                  {getFieldDecorator("sex")(
                    <EnumSelect
                      list={[
                        { code: "01", name: "男" },
                        { code: "02", name: "女" }
                      ]}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="phone" {...formItemLayout}>
                  {getFieldDecorator("phone")(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="address" {...formItemLayout}>
                  {getFieldDecorator("address")(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="id" {...formItemLayout}>
                  {getFieldDecorator("id")(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="email" {...formItemLayout}>
                  {getFieldDecorator("email")(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </SearchWrapper>
        </Section>

        <Section title="测试二">
          <SearchWrapper
            onSearch={this.onSearch}
            setRef={swRef => this.swRef = swRef}
            searchs={this.searchs}
            defaultRowCount={1}
          />
        </Section>
      </React.Fragment>
    )
  }
}
