# 组件 - FormTable

## 功能描述

> 表单组件 - 表格表单项组件

## 参数说明

```javascript
static propTypes = {

}

static defaultProps = {

}
```

## 组件使用

```javascript
import { Form, Input, Button } from "antd";
import { FormTable, EnumSelect, EnumChoice } from "anice-ui";

const RTRow = FormTable.RTRow;
const RItem = FormTable.RItem;

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
      {getFieldDecorator("ramark", {
        rules: [
          { required: true, message: "个人简介不能为空" },
          { max: 200, message: "不能超过200个字符" },
        ],
      })(<Input.TextArea />)}
    </RItem>
  </RTRow>
</FormTable>;
```
