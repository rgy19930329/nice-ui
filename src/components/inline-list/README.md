# 组件 - InlineList

## 功能描述

> 数据展示 - 行内列表数据展示

## 参数说明

```javascript
static propTypes = {
  list: PropTypes.array, // 数据源
  split: PropTypes.node, // 数据间隔元素，默认为中文顿号
  render: PropTypes.func, // 元数据渲染函数
}

static defaultProps = {
  list: [],
  split: "、",
  render: (item) => {
    if (typeof item === "string") {
      return item;
    } else {
      return JSON.stringify(item);
    }
  },
}
```

## 组件使用

```javascript
import { InlineList } from "ky-nice-ui";

<InlineList
  list={["发文", "收文-会议", "收文-案件"]}
/>

<InlineList
  list={[
    { code: "01", name: "发文" },
    { code: "02", name: "收文-会议" },
    { code: "03", name: "收文-案件" },
  ]}
  split={<a> | </a>}
  render={item => `${item.code}.${item.name}` }
/>
```
