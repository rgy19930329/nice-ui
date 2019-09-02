# 组件 - EnumSelect

## 功能描述

下拉选择组件

## 参数说明

```javascript
static propTypes = {
  list: PropTypes.array, // 数据源列表
  codeKey: PropTypes.string, // code 键名
  labelKey: PropTypes.string, // label 键名
  createPromise: PropTypes.func, // 传入一个生成promise的函数
  promiseCondition: PropTypes.string, // promise重复触发条件标识
  hasAll: PropTypes.bool, // 是否支持选择"全部"
  showSearch: PropTypes.bool, // 是否支持搜索
  searchPromise: PropTypes.func, // 传入一个生成search promise的函数
  searchDelay: PropTypes.number, // 搜索时的等待输入时间（毫秒） 
}

static defaultProps = {
  list: [],
  codeKey: "code",
  labelKey: "name",
  hasAll: false,
  promiseCondition: "",
  showSearch: false,
  searchPromise: () => new Promise(resolve => resolve([])),
  searchDelay: 500,
  style: {
    width: "100%",
  }
}
```

## 组件使用

```javascript
import { EnumSelect } from "nice-ui";

<EnumSelect
  placeholder="请选择"
  style={{width: 200}}
  createPromise={() => fetch({
    url: "/example/fruits",
  }).then(res => res.data)}
/>
```