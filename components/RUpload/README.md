# 组件 - RUpload

## 功能描述

> 表单组件 - 文件上传

## 参数说明

```javascript
static propTypes = {
  value: PropTypes.array,
  maxSize: PropTypes.number, // 文件最大多少M
  maxNumber: PropTypes.number, // 文件最多上传多少个
  readOnly: PropTypes.bool, // 是否只读模式
  text: PropTypes.node, // 上传按钮区内容
  triggerArea: PropTypes.func, // 触发区域（返回jsx），设置该属性，text属性会被覆盖
  uploadProps: PropTypes.object, // antd Upload 上传属性
  tips: PropTypes.object, // 信息提示器
  transformFrom: PropTypes.func, // 将上传接口返回的字段转换成组件内部使用的字段（转成这样 { id(必选), name(必选), url(可选) }）
  transformTo: PropTypes.func, // 将组件内部使用的字段转换成提交接口需要的字段（从这样转 { id(必选), name(必选), url(可选) }）
}

static defaultProps = {
  maxSize: 10, // 10M
  maxNumber: 5, // 5个
  readOnly: false, // 可编辑状态
  text: "文件上传",
  triggerArea: null,
  uploadProps: {
    action: "/yapi/upload",
    headers: {
      Authorization: "5cc8019d300000980a055e76",
    },
    beforeUpload: (file) => true,
  },
  tips: message, // 默认为antd 的 message（自定义时 至少需要提供 tips.success, tips.error）
  transformFrom: (file) => ({ id: file.fileId, name: file.fileName }),
  transformTo: (file) => ({ fileId: file.id, fileName: file.name }),
}
```

## 组件使用

```javascript
import { RUpload } from "ky-nice-ui";

{getFieldDecorator("test", {
  initialValue: [
    {
      fileId: "tgClJZxT94SFBVCAqle4nsOy5XFXQ6hp",
      fileName: "ranguangyu.txt",
    }
  ]
})(
  <RUpload
    transformFrom={(resp) => {
      return {
        id: resp.fileId,
        name: resp.fileName,
        url: `/yapi/download?id=${resp.fileId}`,
      }
    }}
  />
)}
```