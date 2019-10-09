/**
 * @desc 组件 - ConnectedModal
 * @author rgy
 * @date 2019-10-09 15:36:51
 */

import "./index.less";
import React from "react";
import { Modal, Input, DatePicker, message } from "antd";
import ListPage from "@components/ListPage";
import EnumSelect from "@components/EnumSelect";
import { fetch } from "@utils";

const RangePicker = DatePicker.RangePicker;

export default class ConnectedModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      selectedRows: [],
    };

    props.setRef && props.setRef(this);
  }

  componentDidMount() {

  }

  createSearchs = () => {
    return [
      [
        {
          label: "姓名",
          fname: "name",
          field: (
            <Input />
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

  open = () => {
    this.setState({ visible: true });
  }

  onOk = () => {
    const { onChange } = this.props; 
    const { selectedRows } = this.state;
    onChange && onChange(selectedRows);
    this.setState({ visible: false });
  }

  render() {
    return (
      <Modal
        title="关联用户"
        visible={this.state.visible}
        onOk={this.onOk}
        onCancel={() => this.setState({ visible: false })}
        wrapClassName="comp-connected-modal-wrapper"
        width={800}
        destroyOnClose
      >
        <ListPage
          rowKey="bid"
          columns={this.columns}
          createSearchs={this.createSearchs}
          createPromise={this.createPromise}
          searchOptions={{
            resetImmediately: true,
            defaultRowCount: 1
          }}
          tableProps={{
            rowSelection: {
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRows });
              }
            }
          }}
        />
      </Modal>
    )
  }
}
