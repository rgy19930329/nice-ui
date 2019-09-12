/**
 * @desc 组件演示 - SearchWrapper
 * @author rgy
 * @date 2019-09-03 15:39:49
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import SearchWrapper from "@components/SearchWrapper";
import { Form, Row, Col, Input, InputNumber } from "antd";
import withFormInChild from "@components/withFormInChild";
import PageWrapper from "@src/components/PageWrapper";
import { fetch } from "@utils";
import EnumSelect from "@components/EnumSelect";

@Form.create()
@withFormInChild
class PreviewSearchWrapper extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  /**
   * 查询
   */
  onSearch = async (query) => {
    console.log(query);
    let result = await fetch("/yapi/test", query);
    console.log(result);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageWrapper
        comp="SearchWrapper"
        className="page-search-wrapper-wrapper"
      >
        <SearchWrapper
          onSearch={this.onSearch}
          setRef={(swRef) => this.swRef = swRef}
        >
          <Row>
            <Col span={8}>
              <Form.Item label="name">
                {getFieldDecorator("name")(
                  <Input onPressEnter={this.swRef && this.swRef.onSearch} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="age">
                {getFieldDecorator("age")(
                  <InputNumber style={{width: "100%"}} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="dept">
                {getFieldDecorator("dept")(
                  <Input />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="sex">
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
              <Form.Item label="phone">
                {getFieldDecorator("phone")(
                  <Input />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="address">
                {getFieldDecorator("address")(
                  <Input />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="id">
                {getFieldDecorator("id")(
                  <Input />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="email">
                {getFieldDecorator("email")(
                  <Input />
                )}
              </Form.Item>
            </Col>
          </Row>
        </SearchWrapper>
      </PageWrapper>
    )
  }
}

render(<PreviewSearchWrapper />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}