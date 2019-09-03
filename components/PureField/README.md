# 组件 - PureField

## 功能描述

> 表单组件 - 纯数据展示

## 参数说明

```javascript
static propTypes = {
  transform: PropTypes.func,
}

static defaultProps = {
  transform: null,
}
```

## 组件使用

```javascript
import { PureField } from "nice-ui";

{getFieldDecorator("name")(
  <PureField transform={(value) => `【${value}】`} />
)}
```