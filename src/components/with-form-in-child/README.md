# 组件 - withFormInChild

## 功能描述

> 高阶组件 - 在 context 中传递 form

## 参数说明

```javascript
static childContextTypes = {
  form: PropTypes.object,
}
```

## 组件使用

父组件：

```javascript
import { Form } from "antd";
import { withFormInChild } from "anice-ui";

@Form.create()
@withFormInChild
class Preview extends React.Component {}
```

后代组件：

```js
import PropTypes from "prop-types";

export default class ValidateWrapper extends React.Component {
  static contextTypes = {
    form: PropTypes.object,
  };
}
```
