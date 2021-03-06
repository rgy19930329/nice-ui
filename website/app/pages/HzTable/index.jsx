/**
 * @Desc: HzTable - preview
 * @Author: RGY
 * @Date: 2020-02-26 10:20:57
 */

import React, { PureComponent } from "react";
import { message, Input } from "antd";
import { HzTable, EnumSelect } from "anice-ui";

import { facilityType } from "./enum";
import result from "./data";

const {
  Ellipsis,
  ValidateWrapper,
  OPERATE_SPAN,
  VALIDATE_TIPS_TYPE_NORMAL,
  VALIDATE_TIPS_TYPE_POPOVER,
} = HzTable;

export default class HzTablePreview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      listRef: null,

      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  columns = [
    {
      title: "名称",
      dataIndex: "facilityName",
      width: "20%",
      render: (text, record, index) => {
        return <a>{text}</a>;
      },
      // createEditComp: ({ text, record, index }, { getFieldDecorator }) => {
      //   return (
      //     getFieldDecorator("facilityName", {
      //       rules: [
      //         {
      //           required: true,
      //           message: "请输入设备名称",
      //         },
      //       ],
      //       initialValue: text,
      //     })(<Input />)
      //   )
      // },
      createEditComp: {
        component: "Input",
        options: {
          rules: [
            {
              required: true,
              message: "请输入设备名称",
            },
          ],
        },
      },
      // createEditComp: {
      //   component: (
      //     <Input.TextArea />
      //   ),
      //   options: {
      //     rules: [
      //       {
      //         required: true,
      //         message: "请输入设备名称",
      //       },
      //     ]
      //   }
      // },
    },
    {
      title: "设施照片",
      dataIndex: "images",
      render: (text) => {
        let image = text.replace(/\$\$$/, "");
        return <img style={{ width: 50, height: 50 }} src={image} />;
      },
    },
    {
      title: "类别",
      dataIndex: "facilityCode",
      width: "15%",
      createEditComp: {
        component: "EnumSelect",
        antdProps: {
          list: facilityType,
        },
        options: {
          rules: [
            {
              required: true,
              message: "请选择类别",
            },
          ],
        },
      },
      createNormalComp: (record) => record.facilityCodeName,
    },
    {
      title: "安装地址",
      dataIndex: "address",
      render: (text) => <Ellipsis>{text}</Ellipsis>,
    },
    {
      title: "所属小区",
      dataIndex: "residenceName",
    },
    {
      title: "操作",
      dataIndex: "id",
      isOperateColumn: true,
      extendRender: (text, record, index) => {
        return (
          <React.Fragment>
            <a
              style={{ marginRight: OPERATE_SPAN }}
              onClick={() => message.warning(`测试 ${index + 1}`)}
            >
              测试
            </a>
          </React.Fragment>
        );
      },
    },
  ];

  createPromise = (params) => {
    console.log(params);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (result.code === "0103010000") {
          const totalCount = result.data.pageParam.total;
          const currentPageResult = result.data.data;
          resolve({
            totalCount,
            currentPageResult,
          });
        } else {
          message.error(result.message);
        }
      }, 500);
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>HzTable</h1>

        <HzTable
          rowKey="facilityId"
          columns={this.columns}
          createPromise={this.createPromise}
          setRef={(listRef) => {
            this.setState({ listRef });
          }}
          hasSerialNo
          defaultOperate={{
            updateFunc: async (record) => {
              console.log("保存成功", record);
              message.success(`保存成功：${JSON.stringify(record)}`);
              return { success: true };
            },
            deleteFunc: async (record) => {
              console.log("删除成功", record);
              message.success(`删除成功：${record.facilityName}`);
              return { success: true };
            },
          }}
          antdProps={{
            rowSelection: {
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(
                  "selectedRowKeys",
                  selectedRowKeys,
                  "selectedRows: ",
                  selectedRows
                );
                this.setState({ selectedRowKeys, selectedRows });
              },
            },
          }}
          ValidateWrapper={(props) => (
            <ValidateWrapper {...props} tipsType={VALIDATE_TIPS_TYPE_NORMAL} />
          )}
          handleBarOptions={{
            searchOptions: {
              show: true,
              searchKey: "customSearch",
              antdProps: {
                placeholder: "自定义 placeholder",
                style: {
                  width: 280,
                },
              },
            },
            handleOptions: {
              gutter: 10,
              elements: [
                {
                  antdProps: {
                    icon: "plus",
                    children: "新增",
                    onClick: () => {
                      message.success("新增成功");
                      this.state.listRef.dataLoad();
                    },
                  },
                },
                {
                  antdProps: {
                    icon: "minus",
                    children: "删除",
                    disabled: this.state.selectedRowKeys.length === 0,
                    onClick: () => {
                      message.success(`${this.state.selectedRowKeys}删除成功`);
                      this.state.listRef.dataLoad();
                    },
                  },
                },
                {
                  elementType: "custom",
                  render: () => {
                    return <a>导入模板下载</a>;
                  },
                },
              ],
            },
          }}
          searchBarOptions={{
            conditions: [
              {
                label: "设施类别",
                render: (getFieldDecorator, form) => {
                  return getFieldDecorator("facilityCode")(
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
                  );
                },
              },
              {
                label: "设施名称",
                render: (getFieldDecorator, form) => {
                  return getFieldDecorator("facilityName")(
                    <Input style={{ width: 200 }} />
                  );
                },
              },
            ],
          }}
        />
      </React.Fragment>
    );
  }
}
