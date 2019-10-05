# 组件 - ListPage

## 功能描述

> 场景组件 - 带查询条件的列表页

## 参数说明

```javascript
static propTypes = {
  rowKey: PropTypes.string, // Table 组件的rowKey属性
  columns: PropTypes.array, // 列模式（数据结构：[{ title, dataIndex }, ...]）
  createSearchs: PropTypes.func, // 返回查询条件的相关字段
  createPromise: PropTypes.func, // 创建获取列表数据的promise（它返回的数据结构：{ totalCount, currentPageResult }）
  searchOptions: PropTypes.object, // SearchWrapper 组件的相关属性
  tableProps: PropTypes.object, // Table 组件的相关属性
  extendButtons: PropTypes.node, // 附加操作区按钮定制
}

static defaultProps = {
  rowKey: "id",
  columns: [],
  createPromise: () => new Promise(resolve => resolve({
    totalCount: 0,
    currentPageResult: [],
  })),
  searchOptions: {},
}
```

## 组件使用

```javascript
import { ListPage } from "nice-ui";

createSearchs = () => {
  return [
    [
      {
        label: "流水号",
        fname: "bid",
        field: (
          <Input />
        ),
      },
      {
        label: "年龄",
        fname: "age",
        field: (
          <InputNumber style={{width: "100%"}} />
        ),
      },
      {
        label: "部门",
        fname: "dept",
        field: (
          <EnumSelect
            placeholder="请选择"
            list={[
              "研发部",
              "市场部",
              "客服部",
              "公关部",
              "办公室"
            ]}
          />
        )
      }
    ],
    [
      {
        label: "创建时间",
        fname: "duringDate",
        field: (
          <RangePicker />
        )
      },
      {
        label: "状态",
        fname: "status",
        field: (
          <EnumSelect
            placeholder="请选择"
            list={[
              "草稿",
              "代审",
              "驳回",
              "办结"
            ]}
          />
        )
      }
    ]
  ]
}

columns = [
  {
    title: "序号",
    dataIndex: "$no",
    render: (text, record, index) => <div>{index + 1}</div>
  },
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
  {
    title: "部门",
    dataIndex: "dept",
  },
  {
    title: "创建时间",
    dataIndex: "createDate",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "操作",
    dataIndex: "bid",
    render: (text) => <a onClick={() => this.onDelete(text)}>删除</a>
  }
]

createPromise = (params) => {
  return fetch("/yapi/list-page", params).then(result => {
    if (result.success) {
      const { totalCount, currentPageResult } = result.data;
      return {
        totalCount,
        currentPageResult,
      }
    } else {
      message.error(result.resultMessage);
    }
  });
}

onDelete = async (bid) => {
  Modal.confirm({
    title: "提示",
    content: "是否删除该项？",
    onOk: async () => {
      let result = await fetch({
        url: "/yapi/list-page-delete",
        method: "post",
        data: {
          bid,
        }
      });
      if (result.success) {
        message.success("操作成功");
        this.listRef.dataLoad();
      }
    }
  });
}

render() {
  return (
    <ListPage
      rowKey="bid"
      columns={this.columns}
      createSearchs={this.createSearchs}
      createPromise={this.createPromise}
      searchOptions={{
        resetImmediately: true,
        defaultRowCount: 1
      }}
      setRef={listRef => this.listRef = listRef}
      extendButtons={(
        <Fragment>
          <Button icon="plus-circle" onClick={this.onAdd}>新增</Button>
          <Button icon="delete" onClick={this.onBatchDelete}>批量删除</Button>
        </Fragment>
      )}
      tableProps={{
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.setState({ selectedRowKeys });
          }
        }
      }}
    />
  )
}
```