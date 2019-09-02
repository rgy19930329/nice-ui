# 组件 - RichText

tips: 请先安装 "react-quill": "^1.3.3"

`npm install react-quill@1.3.3 --save`

## 功能描述

富文本编辑器quill

## 参数说明

```javascript
static propTypes = {
  
}

static defaultProps = {
  
}
```

## 组件使用

```javascript
import { RichText } from "nice-ui";

<Form.Item>
  <RichText
    {...this.props.form.getFieldProps("text", {
      rules: [
        { required: true, message: "富文本内容不能为空" }
      ]
    })}
  />
</Form.Item>
```