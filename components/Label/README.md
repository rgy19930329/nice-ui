# 组件 - Label

## 功能描述

数据展示 - 字段名和值

## 参数说明

```javascript
static propTypes = {
  title: PropTypes.node, // 字段说明
  value: PropTypes.node, // 值
  isLongText: PropTypes.bool, // 是否是长文本
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