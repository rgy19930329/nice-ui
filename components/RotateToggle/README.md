# 组件 - RotateToggle

## 功能描述

> 控制组件 - 旋转开关

## 参数说明

```javascript
static propTypes = {
  isOpen: PropTypes.bool, // 是否打开
  rotate: PropTypes.array, // 旋转角度数组 [关闭时的角度，打开时的角度]
}

static defaultProps = {
  isOpen: false,
  rotate: [0, 180],
}
```

## 组件使用

```javascript
import { Icon } from "antd";
import { RotateToggle } from "nice-ui";

<a onClick={() => this.setState({ isOpen: !isOpen })}>
  <RotateToggle isOpen={isOpen}>
    <Icon type={"up"} />
  </RotateToggle>
</a>
```