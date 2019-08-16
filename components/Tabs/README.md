# 组件 - Tabs

## 功能描述

> 布局组件 - 区域现实隐藏切换

## 参数说明

```javascript
static propTypes = {
  panes: PropTypes.array,
}

static defaultProps = {
  panes: [],
}
```

## 组件使用

```javascript
import Tabs from "nice-ui";

<Tabs
  defaultActiveKey="2"
  panes={[
    {
      tab: "原生表单",
      key: "1",
      content: <div>原生表单</div>
    },
    {
      tab: "配置表单",
      key: "2",
      content: <div>配置表单</div>
    }
  ]}
/>
```