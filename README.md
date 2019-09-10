# nice-ui

基于 react、antd 封装的升级版ui库

## Project setup
```
npm install --verbose
```

## New & Remove
```
npm run new

npm run remove
```

## Development
```
npm run dev

http://127.0.0.1:7777/
```

## Build
```
npm run build
```

## Install

```
npm install nice-ui@https://github.com/rgy19930329/nice-ui.git#master --save

修改 webpack 配置：

module: {
  loaders: [
    {
      test: /\.(js|jsx)$/,
      include: [
        ...
        path.resolve(__dirname, 'node_modules/nice-ui'),
      ],
    }
  ]
}
```

## Import

```
import { Label } from "nice-ui";
```

## Component List

| Component | Desc  | Author | Date |
| ---- | ---- | :----: | ------ |
| [Label](./components/Label/README.md)  | 数据展示 - 字段名和值 | rgy | 2019-5-1 |
| [EnumSelect](./components/EnumSelect/README.md)  | 表单组件 - 下拉选择组件 | rgy | 2019-08-08 15:25:34 |
| [RichText](./components/RichText/README.md)  | 表单组件 - 富文本编辑器 | rgy | 2019-08-12 10:08:10 |
| [HOCAsync](./components/HOCAsync/README.md)  | 高阶组件 - 代码分割，按需加载 | rgy | 2019-08-13 13:58:31 |
| [HOCLoading](./components/HOCLoading/README.md)  | 高阶组件 - 为组件添加数据加载Loading效果 | rgy | 2019-08-13 14:05:54 |
| [CellLimit](./components/CellLimit/README.md)  | 数据展示 - 超出限制宽度部分通过省略号展示 | rgy | 2019-08-13 17:17:11 |
| [EnumChoice](./components/EnumChoice/README.md)  | 表单组件 - 选择组件（包括单选、复选） | rgy | 2019-08-13 22:41:53 |
| [Section](./components/Section/README.md)  | 布局组件 - 区域包裹工具 | rgy | 2019-08-13 23:28:53 |
| [Tabs](./components/Tabs/README.md)  | 布局组件 - 区域现实隐藏切换 | rgy | 2019-08-16 15:33:54 |
| [EditTable](./components/EditTable/README.md)  | 表单组件 - 可编辑表格 | rgy | 2019-08-16 15:59:24 |
| [HOCDebounce](./components/HOCDebounce/README.md)  | 高阶组件 - 防抖 | rgy | 2019-08-19 14:49:21 |
| [ValidateWrapper](./components/ValidateWrapper/README.md)  | 数据展示 - 校验信息提示容器 | rgy | 2019-08-27 17:42:46 |
| [FormTable](./components/FormTable/README.md)  | 表单组件 - 表格表单项组件 | rgy | 2019-08-30 18:00:28 |
| [withQuery](./components/withQuery/README.md)  | 高阶组件 - 参数解析 | rgy | 2019-09-02 11:35:13 |
| [withFormInChild](./components/withFormInChild/README.md)  | 高阶组件 - 在context中传递form | rgy | 2019-09-02 17:13:03 |
| [PureField](./components/PureField/README.md)  | 表单组件 - 纯数据展示 | rgy | 2019-09-03 13:39:31 |
| [SearchWrapper](./components/SearchWrapper/README.md)  | 布局组件 - 搜索区包裹组件 | rgy | 2019-09-03 15:39:49 |
| [RotateToggle](./components/RotateToggle/README.md)  | 控制组件 - 旋转开关 | rgy | 2019-09-03 18:27:17 |
| [MarkDown](./components/MarkDown/README.md)  | 数据展示 - 解析markdown文本并展示 | rgy | 2019-09-04 13:59:17 |
| [InlineList](./components/InlineList/README.md)  | 数据展示 - 行内列表数据展示 | rgy | 2019-09-05 15:41:56 |
| [RConnect](./components/RConnect/README.md)  | 高阶组件 - 帮助使用react-redux时简化使用方式 | rgy | 2019-09-09 09:32:56 |
| [RUpload](./components/RUpload/README.md)  | 表单组件 - 文件上传 | rgy | 2019-09-10 14:53:45 |