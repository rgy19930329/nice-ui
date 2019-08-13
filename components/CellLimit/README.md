# 组件 - CellLimit

## 功能描述

> 数据展示 - 超出限制宽度部分通过省略号展示

## 参数说明

```javascript
static propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

static defaultProps = {
  width: "100%",
}
```

## 组件使用

```javascript
import CellLimit from "nice-ui";

<CellLimit>xxxxxxxxxxx</CellLimit>
```