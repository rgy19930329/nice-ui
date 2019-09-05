# 组件 - Label

## 功能描述

数据展示 - 字段名和值

## 参数说明

```javascript
static propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  isLongText: PropTypes.bool,
}

static defaultProps = {
  title: "字段说明",
  value: "值",
  isLongText: false,
}
```

## 组件使用

```javascript
import { Label } from "nice-ui";

<Label title="发布者" value="张三" />
```