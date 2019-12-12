/**
 * @desc 组件演示 - HzTable
 * @author RGY
 * @date 2019-12-11 13:45:15
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { message, Input } from "antd";
import HzTable from "@components/HzTable";
import Ellipsis from "@components/HzTable/mod/Ellipsis";
import HandleBar from "@components/HzTable/mod/HandleBar";
import SearchBar from "@components/HzTable/mod/SearchBar";
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
      createEditComp: (text) => {
        return (
          <Input defaultValue={text} />
        )
      }
    },
    {
      title: "设施照片",
      dataIndex: "images",
      render: (text) => {
        let image = text.replace(/\$\$$/, "");
        return (
          <img style={{width: 50, height: 50}} src={image} />
        )
      }
    },
    {
      title: "类别",
      dataIndex: "facilityCode",
      width: "15%",
      createEditComp: (text) => {
        return (
          <EnumSelect
            defaultValue={text}
            list={facilityType}
          />
        )
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
      dataIndex: "bid",
      render: (text, record, index) => {
        return (
          <React.Fragment>
            <a onClick={() => this.onEdit(index)} style={{marginRight: 10}}>编辑</a>
            <a onClick={() => this.onCancel(index)} style={{marginRight: 10}}>取消</a>
            <a onClick={() => this.onDelete(record)}>删除</a>
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

  onDelete = async ({ facilityId }) => {
    Modal.confirm({
      title: "提示",
      content: "是否删除该项？",
      onOk: async () => {
        message.success("操作成功");
        this.state.listRef.dataLoad();
      }
    });
  }

  onEdit = (index) => {
    this.state.listRef.makeEditRow(index);
  }

  onCancel = (index) => {
    this.state.listRef.makeNormalRow(index);
  }

  onAdd = () => {
    message.info("新增数据");
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
                      <Input style={{ width: 200 }}/>
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