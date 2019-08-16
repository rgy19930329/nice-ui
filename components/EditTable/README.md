# 组件 - EditTable

## 功能描述

> 表单组件 - 可编辑表格

## 参数说明

```javascript
static propTypes = {
  dataSource: PropTypes.array, // 数据源
  hasSN: PropTypes.bool, // 是否需要支持序号
  onChange: PropTypes.func, // 列表变更回调
  id: PropTypes.string, // edit table id
}

static defaultProps = {
  dataSource: [],
  hasSN: false,
  id: "et",
}
```

## 组件使用

```javascript
import EditTable from "nice-ui";

<EditTable
  // props
/>
```