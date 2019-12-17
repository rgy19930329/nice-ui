# 组件 - HzTable

## 功能描述

> 华智表格组件

## 参数说明

```javascript
static propTypes = {
  rowKey: PropTypes.string, // Table 组件的rowKey属性，唯一性
  columns: PropTypes.array, // 列模式（数据结构：[{ title, dataIndex }, ...]）
  createPromise: PropTypes.func, // 创建获取列表数据的promise（它返回的数据结构：{ totalCount, currentPageResult }）
  antdProps: PropTypes.object, // antd Table 组件的相关属性
  pagination: PropTypes.object, // antd Pagination 组件相关属性
  hasSerialNo: PropTypes.bool, // 是否有序号
  defaultOperate: PropTypes.object, // 是否有默认行为的操作列（带 编辑、保存、删除 基本功能）
  HandleBar: PropTypes.func, // 自定义操作栏（React 对象，详情见 README.md）
  SearchBar: PropTypes.func, // 自定义筛选栏（React 对象，详情见 README.md）
  handleBarOptions: PropTypes.object, // 定义操作栏元素（普通对象，详情见 README.md）与 HandleBar 属性，二者配置一个即可
  searchBarOptions: PropTypes.object, // 定义筛选栏元素（普通对象，详情见 README.md）与 SearchBar 属性，二者配置一个即可
  ValidateWrapper: PropTypes.func, // 自定义表单提示组件（React 对象，详情见 README.md）
}

static defaultProps = {
  rowKey: "id",
  columns: [],
  createPromise: () => new Promise(resolve => resolve({
    totalCount: 0,
    currentPageResult: [],
  })),
  antdProps: {},
  pagination: {},
  hasSerialNo: false,
  defaultOperate: null,
}

static childContextTypes = {
  form: PropTypes.object,
}
```

## 组件使用

```javascript
import { HzTable } from "nice-ui";
```

#### 自定义操作栏和筛选栏

> 相关属性：HandleBar, SearchBar

```js
// components/HandleBar
export default class HandleBar extends PureComponent {
  
  onSearch = (value) => {
    const { listRef } = this.props;
    listRef && listRef.dataLoad({ search: value });
  }

  render() {
    return (
      <div className="comp-handle-bar-wrapper">
        <Button
          icon="plus" 
          type="primary" 
          ghost
          style={{marginRight: 10}}
        >
          新增
        </Button>
        <Button 
          icon="minus" 
          type="primary" 
          ghost
          style={{marginRight: 10}}
        >
          删除
        </Button>

        <Search
          placeholder="检索内容"
          onSearch={this.onSearch}
          style={{ width: 200 }}
        />
      </div>
    )
  }
}

// components/SearchBar
export default class SearchBar extends PureComponent {

  onChange = (value) => {
    const { listRef } = this.props;
    listRef && listRef.dataLoad({
      facilityCode: value,
    });
  }

  render() {
    return (
      <div className="comp-search-bar-wrapper">
        <span>设施类别：</span>
        <EnumSelect
          style={{width: 200}}
          list={[
            { code: "1", name: "高清监控" },
            { code: "2", name: "人脸卡口" },
            { code: "3", name: "车辆卡口" },
            { code: "4", name: "WIFI探针" },
            { code: "5", name: "人脸门禁" },
            { code: "6", name: "消防感知" },
          ]}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

```

```js
import CustomHandleBar from "./components/HandleBar";
import CustomSearchBar from "./components/SearchBar";

// 以这种方式引入 用户可以自定义操作栏和筛选栏位置

render() {
  return (
    <React.Fragment>
      <CustomHandleBar listRef={this.state.listRef} />
      <CustomSearchBar listRef={this.state.listRef} />
      <HzTable
        rowKey="facilityId"
        columns={this.columns}
        createPromise={this.createPromise}
        setRef={listRef => {
          this.setState({ listRef });
        }}
      />
    </React.Fragment>
  )
}

// 还有另一种引入方式如下，布局方式为默认（操作栏、筛选栏、数据表 从上往下依次排列）

render() {
  return (
    <HzTable
      rowKey="facilityId"
      columns={this.columns}
      createPromise={this.createPromise}
      setRef={listRef => {
        this.setState({ listRef });
      }}
      HandleBar={CustomHandleBar}
      SearchBar={CustomSearchBar}
    />
  )
}
```

#### 定义操作栏元素

> 相关属性：handleBarOptions

> Tips: handleBarOptions 与 HandleBar 配置一个即可

```js
render() {
  return (
    <HzTable
      rowKey="facilityId"
      columns={this.columns}
      createPromise={this.createPromise}
      setRef={listRef => {
        this.setState({ listRef });
      }}
      handleBarOptions={{
        searchOptions: { // 检索区配置
          show: true, // 是否展示
          searchKey: "customSearch", // 检索区输入框对应键值
          antdProps: { // 组件对应antd相关属性
            placeholder: "自定义 placeholder",
            style: {
              width: 280,
            }
          }
        },
        handleOptions: { // 操作区配置
          gutter: 10, // 操作元素间距
          elements: [
            {
              antdProps: {
                icon: "plus",
                children: "新增",
                onClick: () => {
                  message.success("新增成功");
                  this.state.listRef.dataLoad();
                }
              }
            },
            {
              antdProps: {
                icon: "minus",
                children: "删除",
                disabled: this.state.selectedRowKeys.length === 0,
                onClick: () => {
                  message.success(`${this.state.selectedRowKeys}删除成功`);
                  this.state.listRef.dataLoad();
                }
              },
            },
            {
              elementType: "custom", // 自定义元素类型（默认为 button，目前支持 button 和 custom 类型）
              render: () => {
                return <a>导入模板下载</a>
              }
            },
          ]
        }
      }}
    />
  )
}
```

#### 定义筛选栏元素


> 相关属性：searchBarOptions

> Tips: searchBarOptions 与 SearchBar 配置一个即可

```js
render() {
  return (
    <HzTable
      rowKey="facilityId"
      columns={this.columns}
      createPromise={this.createPromise}
      setRef={listRef => {
        this.setState({ listRef });
      }}
      searchBarOptions={{
        conditions: [
          {
            label: "设施类别",
            render: (getFieldDecorator, form) => {
              return (
                getFieldDecorator("facilityCode")(
                  <EnumSelect
                    style={{ width: 200 }}
                    list={[
                      { code: "1", name: "高清监控" },
                      { code: "2", name: "人脸卡口" },
                      { code: "3", name: "车辆卡口" },
                      { code: "4", name: "WIFI探针" },
                      { code: "5", name: "人脸门禁" },
                      { code: "6", name: "消防感知" },
                    ]}
                  />
                )
              )
            }
          },
          {
            label: "设施名称",
            render: (getFieldDecorator, form) => {
              return (
                getFieldDecorator("facilityName")(
                  <Input style={{ width: 200 }} />
                )
              )
            }
          }
        ]
      }}
    />
  )
}
```

#### 列表数据请求规则

> 相关属性：createPromise

> Tips：不干涉用户数据请求方式，只需 resolve 参数 totalCount(数据总条数), currentPageResult(列表数据) 的Promise对象即可。入参params为组装好的查询条件。

```js
createPromise = (params) => {
  return fetch({
    url: "/API/BASEINFOSERVICE/ic/security/facilities/info/page",
    method: "post",
    data: params,
    headers: { 
      "token": "ST-43-u-cBVtKbUPpMoyyhsU-Vp35tv4gbss-sso-pod-0",
      "User": "username%253Aadmin%2526usercode%253Aadmin"
    }
  }).then(result => {
    if (result.code === "0103010000") {
      const totalCount = result.data.pageParam.total;
      const currentPageResult = result.data.data;
      return {
        totalCount,
        currentPageResult,
      }
    } else {
      message.error(result.message);
    }
  });
}
```

#### 配置默认行为操作列（带 编辑、保存、删除 基本功能）

> 相关配置：defaultOperate

> Tips: updateFunc 和 deleteFunc 均为 Promise 对象。当 resolve 参数 success 为 true 时，列表会自动重新加载数据。

```js
render() {
  return (
    <HzTable
      rowKey="facilityId"
      columns={this.columns}
      createPromise={this.createPromise}
      setRef={listRef => {
        this.setState({ listRef });
      }}
      HandleBar={CustomHandleBar}
      SearchBar={CustomSearchBar}
      defaultOperate={{
        updateFunc: async (record) => { // 若配置该项，则自动绑定 编辑、保存、取消 功能
          console.log("保存成功", record);
          message.success(`保存成功：${JSON.stringify(record)}`);
          return { success: true };
        },
        deleteFunc: async (record) => { // 若配置该项，则自动绑定 删除 功能
          console.log("删除成功", record);
          message.success(`删除成功：${record.facilityName}`);
          return { success: true };
        }
      }}
    />
  )
}
```

#### 自定义表单项提示

> 相关属性：ValidateWrapper

> Tips: 表格中点击操作列的“编辑”按钮，指定单元格会变成可编辑状态，当用户编辑过程中和点击“保存”按钮时会对表单项进行校验。该属性便是用来自定义错误提示方式。

> 如不配置 ValidateWrapper，则使用 antd 的 Form.Item 进行默认提示（该方式会让表单错位，看起来不是很自然）。可以配置该属性来重置它。

> 有两种内置模式可供选择：VALIDATE_TIPS_TYPE_NORMAL（普通模式），VALIDATE_TIPS_TYPE_POPOVER（Popover模式），如果依然不满足需求，可按照 ValidateWrapper 的规范进行更深层次的自定义

```js
import HzTable, { 
  Ellipsis, 
  ValidateWrapper, 
  OPERATE_SPAN,
  VALIDATE_TIPS_TYPE_NORMAL, // 普通模式
  VALIDATE_TIPS_TYPE_POPOVER, // Popover模式
} from "@components/HzTable";

render() {
  return (
    <HzTable
      rowKey="facilityId"
      columns={this.columns}
      createPromise={this.createPromise}
      setRef={listRef => {
        this.setState({ listRef });
      }}
      HandleBar={CustomHandleBar}
      SearchBar={CustomSearchBar}
      defaultOperate={{
        updateFunc: async (record) => { // 若配置该项，则自动绑定 编辑、保存、取消 功能
          console.log("保存成功", record);
          message.success(`保存成功：${JSON.stringify(record)}`);
          return { success: true };
        },
        deleteFunc: async (record) => { // 若配置该项，则自动绑定 删除 功能
          console.log("删除成功", record);
          message.success(`删除成功：${record.facilityName}`);
          return { success: true };
        }
      }}
      ValidateWrapper={(props) => <ValidateWrapper {...props} tipsType={VALIDATE_TIPS_TYPE_NORMAL} />}
    />
  )
}
```