# 组件 - withQuery

## 功能描述

> 高阶组件 - 参数解析

## 参数说明


## 组件使用

url: #/user?title=title&value=ranguangyu

```javascript
import { withQuery } from "nice-ui";

@withQuery
export default class User extends React.Component {
  render() {
    const { title, value } = this.props.query;
    return (
      <Section title="测试 withQuery">
        <Label title={title} value={value} />
      </Section>
    )
  }
}
```