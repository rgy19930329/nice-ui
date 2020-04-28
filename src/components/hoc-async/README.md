# 组件 - HocAsync

## 功能描述

高阶组件 - 代码分割，按需加载

## 参数说明

## 组件使用

```javascript
import { HocAsync } from "anice-ui";
import { Route } from "react-router-dom";

const AsyncPage = HocAsync(() => import("@pages/async-page"));

<Route path="/async-page" component={AsyncPage} />;
```
