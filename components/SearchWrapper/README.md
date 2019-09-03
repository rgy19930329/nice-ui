# 组件 - SearchWrapper

## 功能描述

> 布局组件 - 搜索区包裹组件

## 参数说明

```javascript
static propTypes = {
  
}

static defaultProps = {
  
}
```

## 组件使用

```javascript
import { Form, Row, Col, Input } from "antd";
import { SearchWrapper } from "nice-ui";

<SearchWrapper>
  <Row>
    <Col span={8}>
      <Form.Item label="name">
        {getFieldDecorator("name")(
          <Input />
        )}
      </Form.Item>
    </Col>
    <Col span={8}>
      <Form.Item label="age">
        {getFieldDecorator("age")(
          <Input />
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
          <Input />
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