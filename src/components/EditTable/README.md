# 组件 - EditTable

## 功能描述

> 表单组件 - 可编辑表格

## 参数说明

```javascript
static propTypes = {
  dataSource: PropTypes.array, // 数据源
  hasSN: PropTypes.bool, // 是否需要支持序号
  onChange: PropTypes.func, // 列表变更回调
  setRef: PropTypes.func, // setRef
}

static defaultProps = {
  dataSource: [],
  hasSN: false,
}
```

## 组件使用

```javascript
import { EditTable } from "ky-nice-ui";

<EditTable
  hasSN={true}
  columns={this.createColumns()}
  dataSource={this.state.dataSource}
  setRef={et1Ref => this.et1Ref = et1Ref}
/>

<EditTable
  hasSN={true}
  columns={this.createColumns()}
  dataSource={this.state.dataSource}
  setRef={et2Ref => this.et2Ref = et2Ref}
/>

<div className="handler">
  <Button
    type="primary"
    onClick={async () => {
      Promise.all([
        this.et1Ref.doSubmit(),
        this.et2Ref.doSubmit(),
      ]).then(results => {
        console.log(results);
        console.log("校验通过，允许提交");
      }).catch(e => {
        console.error("校验失败");
      });
    }}
  >
    提交
  </Button>
</div>
```