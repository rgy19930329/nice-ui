# 组件 - SearchWrapper

## 功能描述

> 布局组件 - 搜索区包裹组件

## 参数说明

```javascript
static propTypes = {
  form: PropTypes.object,
  formItemLayout: PropTypes.object,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
  hasHandleBar: PropTypes.bool, // 是否有操作行（查询，重置）
  searchText: PropTypes.string,
  resetText: PropTypes.string,
  defaultRowCount: PropTypes.number, // 默认行数，超过默认隐藏
}

static defaultProps = {
  formItemLayout: {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
  hasHandleBar: true,
  searchText: "查询",
  resetText: "重置",
  defaultRowCount: 2,
}

static contextTypes = {
  form: PropTypes.object,
}
```

## 组件使用

```javascript
import { Form, Row, Col, Input } from "antd";
import { SearchWrapper } from "nice-ui";

onSearch = async (query) => {
  console.log(query);
  let result = await fetch("/yapi/test", query);
  console.log(result);
}

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
```