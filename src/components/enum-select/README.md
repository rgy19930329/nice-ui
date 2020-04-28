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
  hasAllText: PropTypes.string, // hasAll为true时，默认文案，默认为"不限"
  showSearch: PropTypes.bool, // 是否支持搜索
  searchPromise: PropTypes.func, // 传入一个生成search promise的函数
  searchDelay: PropTypes.number, // 搜索时的等待输入时间（毫秒）
  readOnly: PropTypes.bool, // 是否只读
  cacheKey: PropTypes.string, // 下拉数据缓存 键名
  render: PropTypes.func, // 复杂项渲染
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
  },
  hasAllText: "全部",
}
```

## 组件使用

```javascript
import { EnumSelect } from "anice-ui";

<EnumSelect
  placeholder="选择性别"
  style={{ width: 200 }}
  list={["男", "女"]}
/>

<EnumSelect
  placeholder="选择岗位"
  style={{ width: 200 }}
  list={[
    { code: "01", name: "开发" },
    { code: "02", name: "产品" },
    { code: "03", name: "测试" }
  ]}
/>

<EnumSelect
  placeholder="请选择"
  style={{ width: 200 }}
  createPromise={() => fetch({
    url: "/example/fruits",
  }).then(res => res.data)}
/>
```
