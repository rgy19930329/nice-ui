## Utils List

| Util | Desc  | Remarks |
| ---- | ---- | ---- |
| fetch | 客户端ajax网络请求封装 | 无 |
| wdio | wilddog io 操作封装 | 需在 &lt;head&gt; 标签中添加 &lt;script src="https://cdn.wilddog.com/js/client/current/wilddog.js"&gt;&lt;/script&gt; 配合使用 |
| storage | localStorage 操作封装 | 无 |
| validator | 表单校验方法 | 方法接收3个参数 (rule, value, callback) |

### fetch

```js
import { fetch } from "nice-ui";

const { get, post } = fetch;

// get请求：

fetch("/yapi/list-page", {
  pageNumber,
  pageSize,
});

// get请求2：

fetch({
  url: "/yapi/list-page",
  data: {
    pageNumber,
    pageSize,
  }
});

// get请求3：

get("/yapi/list-page", {
  pageNumber,
  pageSize,
});

// post请求：

fetch({
  url: "/yapi/list-page-delete",
  method: "post",
  headers: { "X-TOKEN": "e10adc3949ba59abbe56e057f20f883e"}
  data: {
    bid,
  }
});

// post请求2：

post("/yapi/list-page-delete", { bid });
```

### wdio

```js
import { wdio } from "nice-ui";

const { each, remove, add, set, get } = wdio;

each(ref, fn);

remove(ref, id);

add(ref, item);

set(ref, item);

get(ref, fn)
```

### storage

```js
import { local_storage, session_storage } from "nice-ui";

local_storage.set(key, value);
local_storage.get(key);
local_storage.remove(key);
local_storage.clear();

session_storage.set(key, value);
session_storage.get(key);
session_storage.remove(key);
session_storage.clear();
```

### validator

```js
import { validator } from "nice-ui";

const { amountValidator } = validator;

getFieldDecorator("bid", {
  rules: [
    { required: true, message: "bid不能为空" },
    { validator: amountValidator },
  ]
})
```