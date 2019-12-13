/**
 * @desc 组件演示 - HzTable
 * @author RGY
 * @date 2019-12-11 13:45:15
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { message, Input } from "antd";
import HzTable, { Ellipsis, OPERATE_SPAN } from "@components/HzTable";
import EnumSelect from "@components/EnumSelect";
import PageWrapper from "@src/components/PageWrapper";
import withLocale from "@src/components/withLocale";
import { fetch } from "@utils";

import { facilityType } from "./enum";
import result from "./data";
import CustomHandleBar from "./components/HandleBar";
import CustomSearchBar from "./components/SearchBar";

@withLocale
class PreviewHzTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listRef: null,

      selectedRowKeys: [],
      selectedRows: [],
    }
  }

  componentDidMount() {

  }

  columns = [
    {
      title: "名称",
      dataIndex: "facilityName",
      width: "20%",
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
          ]
        }
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
        return (
          <img style={{ width: 50, height: 50 }} src={image} />
        )
      }
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
          ]
        }
      },
      createNormalComp: (record) => record.facilityCodeName,
    },
    {
      title: "安装地址",
      dataIndex: "address",
      render: text => <Ellipsis>{text}</Ellipsis>
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
            <a style={{ marginRight: OPERATE_SPAN }}>测试</a>
          </React.Fragment>
        )
      }
    }
  ]

  createPromise = (params) => {
    // return fetch({
    //   url: "/API/BASEINFOSERVICE/ic/security/facilities/info/page",
    //   method: "post",
    //   data: params,
    //   headers: { 
    //     "token": "ST-43-u-cBVtKbUPpMoyyhsU-Vp35tv4gbss-sso-pod-0",
    //     "User": "username%253Aadmin%2526usercode%253Aadmin"
    //   }
    // }).then(result => {
    //   if (result.code === "0103010000") {
    //     const totalCount = result.data.pageParam.total;
    //     const currentPageResult = result.data.data;
    //     return {
    //       totalCount,
    //       currentPageResult,
    //     }
    //   } else {
    //     message.error(result.message);
    //   }
    // });

    return new Promise(resolve => {
      setTimeout(() => {
        if (result.code === "0103010000") {
          const totalCount = result.data.pageParam.total;
          const currentPageResult = result.data.data;
          resolve({
            totalCount,
            currentPageResult,
          });
          // return {
          //   totalCount,
          //   currentPageResult,
          // }
        } else {
          message.error(result.message);
        }
      }, 500);
    });
  }

  render() {
    return (
      <PageWrapper
        comp="HzTable"
        className="page-hz-table-wrapper"
      >
        {/* <CustomHandleBar listRef={this.state.listRef} />
        <CustomSearchBar listRef={this.state.listRef} /> */}
        <HzTable
          rowKey="facilityId"
          columns={this.columns}
          createPromise={this.createPromise}
          setRef={listRef => {
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
            }
          }}
          antdProps={{
            rowSelection: {
              onChange: (selectedRowKeys, selectedRows) => {
                console.log("selectedRowKeys", selectedRowKeys, "selectedRows: ", selectedRows);
                this.setState({ selectedRowKeys, selectedRows });
              }
            }
          }}
          // HandleBar={CustomHandleBar}
          // SearchBar={CustomSearchBar}
          handleBarOptions={{
            searchOptions: {
              show: true,
              searchKey: "customSearch",
              antdProps: {
                placeholder: "自定义 placeholder",
                style: {
                  width: 280,
                }
              }
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
                  elementType: "custom",
                  render: () => {
                    return <a>导入模板下载</a>
                  }
                },
              ]
            }
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
      </PageWrapper>
    )
  }
}

render(<PreviewHzTable />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}