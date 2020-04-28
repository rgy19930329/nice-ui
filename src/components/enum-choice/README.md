# 组件 - EnumChoice

## 功能描述

> 表单组件 - 选择组件（包括单选、复选）

## 参数说明

```javascript
static propTypes = {
  list: PropTypes.array, // 数据源列表
  codeKey: PropTypes.string, // code 键名
  labelKey: PropTypes.string, // label 键名
  createPromise: PropTypes.func, // 传入一个生成promise的函数
  promiseCondition: PropTypes.string, // promise重复触发条件标识
}

static defaultProps = {
  list: [],
  codeKey: "code",
  labelKey: "name",
  promiseCondition: "",
}
```

## 组件使用

```javascript
import { EnumChoice } from "ky-nice-ui";

<EnumChoice.Radio
  list={[
    { code: "1", name: "type A" },
    { code: "2", name: "type B" },
  ]}
/>

<EnumChoice.Checkbox
  createPromise={() => fetch({
    url: "/example/fruits",
  }).then(res => res.data.list)}
/>
```