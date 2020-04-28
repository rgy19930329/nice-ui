# 组件 - Section

## 功能描述

> 布局组件 - 区域包裹工具

## 参数说明

```javascript
static propTypes = {
  title: PropTypes.node, // 标题
  hasBorder: PropTypes.bool, // 是否有边框
  titleSlot: PropTypes.node, // 标题右侧内容展示
}

static defaultProps = {
  title: "",
  hasBorder: true,
}
```

## 组件使用

```javascript
import { Section } from "anice-ui";

<Section title="xxx Test">xxxxxxx</Section>;
```
