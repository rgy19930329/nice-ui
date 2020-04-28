# 组件 - RCheckbox

## 功能描述

> 表单组件 - 映射 Checkbox 的值

## 参数说明

```javascript
static propTypes = {
  map: PropTypes.object, // 映射表
}

static defaultProps = {
  map: null,
}
```

## 组件使用

```javascript
import { RCheckbox } from "anice-ui";

// 未映射
{
  getFieldDecorator("isAudit")(<RCheckbox>是否开启审核</RCheckbox>);
}

// 映射
{
  getFieldDecorator("isAudit2")(
    <RCheckbox
      map={{
        "1": true,
        "0": false,
      }}
    >
      是否开启审核
    </RCheckbox>
  );
}
```
