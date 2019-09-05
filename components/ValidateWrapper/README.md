# 组件 - ValidateWrapper

## 功能描述

> 数据展示 - 校验信息提示容器

## 参数说明

```javascript
static contextTypes = {
  form: PropTypes.object,
}

static propTypes = {
  validateStatus: PropTypes.object,
  form: PropTypes.object,
}

static defaultProps = {
  validateStatus: {},
}
```

## 组件使用

```javascript
import { ValidateWrapper } from "nice-ui";

const { getFieldDecorator } = this.props.form;
const validateStatus = this.getValidateStatus("name");

<ValidateWrapper validateStatus={validateStatus}>
  {getFieldDecorator("name", {
    rules: [
      { required: true, message: "姓名不能为空" },
      { max: 5, message: "姓名不能超过5个字符" },
    ]
  })(
    <Input
      placeholder="请输入姓名"
      style={{ width: 200, marginRight: 20 }}
    />
  )}
</ValidateWrapper>

<ValidateWrapper form={this.props.form}>
  {getFieldDecorator("age", {
    rules: [
      { required: true, message: "年龄不能为空" },
    ]
  })(
    <Input
      placeholder="请输入年龄"
      style={{ width: 200, marginRight: 20 }}
    />
  )}
</ValidateWrapper>

<ValidateWrapper>
  {getFieldDecorator("sex", {
    rules: [
      { required: true, message: "性别不能为空" },
    ]
  })(
    <Input
      placeholder="请输入性别"
      style={{ width: 200 }}
    />
  )}
</ValidateWrapper>
```