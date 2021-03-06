/**
 * @Desc: ListPage - preview
 * @Author: RGY
 * @Date: 2020-02-26 10:42:18
 */

import React, { PureComponent } from "react";
import { message, Input, InputNumber, DatePicker, Modal, Button } from "antd";
import { ListPage, EnumSelect } from "anice-ui";
import { fetch } from "ky-nice-utils";

const { RangePicker } = DatePicker;
const { get, post } = fetch;

export default class ListPagePreview extends PureComponent {
  createSearchs = () => {
    return [
      [
        {
          label: "流水号",
          fname: "bid",
          field: <Input />,
        },
        {
          label: "年龄",
          fname: "age",
          field: <InputNumber style={{ width: "100%" }} />,
        },
        {
          label: "部门",
          fname: "dept",
          field: (
            <EnumSelect
              placeholder="请选择"
              list={["研发部", "市场部", "客服部", "公关部", "办公室"]}
            />
          ),
        },
      ],
      [
        {
          label: "创建时间",
          fname: "duringDate",
          field: <RangePicker />,
        },
        {
          label: "状态",
          fname: "status",
          field: (
            <EnumSelect
              placeholder="请选择"
              list={["草稿", "代审", "驳回", "办结"]}
            />
          ),
        },
      ],
    ];
  };

  columns = [
    {
      title: "序号",
      dataIndex: "$no",
      render: (text, record, index) => <div>{index + 1}</div>,
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
      render: (text) => <a onClick={() => this.onDelete(text)}>删除</a>,
    },
  ];

  createPromise = (params) => {
    return get("/yapi/list-page", params).then((result) => {
      if (result.success) {
        const { totalCount, currentPageResult } = result.data;
        return {
          totalCount,
          currentPageResult,
        };
      } else {
        message.error(result.resultMessage);
      }
    });
  };

  onDelete = async (bid) => {
    Modal.confirm({
      title: "提示",
      content: "是否删除该项？",
      onOk: async () => {
        let result = await post("/yapi/list-page-delete", {
          bid,
        });
        if (result.success) {
          message.success("操作成功");
          this.listRef.dataLoad();
        }
      },
    });
  };

  onAdd = () => {
    message.info("新增数据");
  };

  onBatchDelete = () => {
    const { selectedRowKeys } = this.state;
    Modal.confirm({
      title: "提示",
      content: "是否批量删除选中项？",
      onOk: async () => {
        let result = await post("/yapi/list-page-delete", {
          bidList: selectedRowKeys,
        });
        if (result.success) {
          message.success("操作成功");
          this.listRef.dataLoad();
        }
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>ListPage</h1>

        <ListPage
          rowKey="bid"
          columns={this.columns}
          createSearchs={this.createSearchs}
          createPromise={this.createPromise}
          searchOptions={{
            resetImmediately: true,
            defaultRowCount: 1,
          }}
          setRef={(listRef) => (this.listRef = listRef)}
          extendButtons={
            <React.Fragment>
              <Button icon="plus-circle" onClick={this.onAdd}>
                新增
              </Button>
              <Button icon="delete" onClick={this.onBatchDelete}>
                批量删除
              </Button>
            </React.Fragment>
          }
          tableProps={{
            rowSelection: {
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys });
              },
            },
          }}
        />
      </React.Fragment>
    );
  }
}
