# 组件 - HocDebounce

## 功能描述

> 高阶组件 - 防抖

## 参数说明

```javascript
static propTypes = {
  onChange: PropTypes.func,
  debounceTime: PropTypes.number, // 防抖时间（单位：ms） 
}

static defaultProps = {
  onChange: noop,
  debounceTime: 300,
}
```

## 组件使用

```javascript
import { Input } from "antd";
import { HocDebounce } from "ky-nice-ui";

const DebounceInput = HocDebounce(Input);

<DebounceInput
  style={{width: 300}}
  placeholder="请输入关键字进行搜索"
  value={this.state.value}
  onChange={(value) => {
    console.log(value);
    this.setState({ value });
  }}
  debounceTime={1000}
/>
```