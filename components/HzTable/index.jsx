/**
 * @desc 组件 - HzTable
 * @author RGY
 * @date 2019-12-11 13:45:15
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Table, Empty } from "antd";

import DefaultHandleBar from "./mod/HandleBar";
import DefaultSearchBar from "./mod/SearchBar";

export default class HzTable extends React.Component {

  static propTypes = {
    rowKey: PropTypes.string, // Table 组件的rowKey属性
    columns: PropTypes.array, // 列模式（数据结构：[{ title, dataIndex }, ...]）
    createPromise: PropTypes.func, // 创建获取列表数据的promise（它返回的数据结构：{ totalCount, currentPageResult }）
    hasSerialNo: PropTypes.bool, // 是否有序号
    antdProps: PropTypes.object, // antd Table 组件的相关属性
    pagination: PropTypes.object, // antd Pagination 组件相关属性
    hasRowSelection: PropTypes.bool, // 表格是否有可选择项checkbox
  }

  static defaultProps = {
    rowKey: "id",
    columns: [],
    createPromise: () => new Promise(resolve => resolve({
      totalCount: 0,
      currentPageResult: [],
    })),
    hasSerialNo: false,
    antdProps: {},
    pagination: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      loaded: false,
      editRow: -1, // 正在编辑的行，-1 表示没有正在编辑的行
      columns: [],
    }

    props.setRef && props.setRef(this);

    this.pagination = Object.assign({
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `共${total}条`,
    }, props.pagination);

    this.query = {};
  }

  componentDidMount() {
    this.fixColumns();
    this.dataLoad();
  }

  /**
   * 列表数据加载
   */
  dataLoad = async (query = {}) => {
    const { createPromise } = this.props;
    let params = this.fixQueryParams(query);
    console.log("dataLoad params", params);
    this.setState({ loaded: false });
    let data = await createPromise(params);
    if (!data) {
      data = {
        totalCount: 0,
        currentPageResult: [],
      }
    }
    this.pagination.total = data.totalCount || 0;
    this.setState({
      dataSource: data.currentPageResult,
      loaded: true,
    });
  }

  /**
   * 列表数据更新
   */
  updateList = (dataSource) => {
    this.setState({ dataSource });
  }

  /**
   * 组装查询参数
   */
  fixQueryParams = (query) => {
    let { current: pageIndex, pageSize } = this.pagination;
    return Object.assign(this.query, query, {
      pageIndex,
      pageSize,
    });
  }

  /**
   * 更新查询条件
   */
  updateQuery = (query) => {
    Object.assign(this.query, query);
  }

  fixColumns = () => {
    let columns = this.props.columns.map((item) => {
      item.key = item.dataIndex;
      if (this.state.editRow >= 0) {
        if (item.createEditComp) {
          item.render = (text, record, index) => {
            if (index === this.state.editRow) {
              return item.createEditComp(text, record, index);
            }
            if (item.createNormalComp) {
              return item.createNormalComp(record);
            }
            return text;
          }
        }
      } else {
        if (item.createNormalComp) {
          item.render = (text, record, index) => {
            return item.createNormalComp(record);
          }
        }
      }
      return item;
    });

    // 加序号
    if (this.props.hasSerialNo) {
      columns.unshift({
        title: "序号",
        dataIndex: "$no",
        width: 40,
        render: (text, record, index) => <div>{index + 1}</div>
      });
    }

    this.setState({ columns });
  }

  makeEditRow = (editRow) => {
    this.setState({ editRow }, () => {
      this.fixColumns();
    });
  }

  makeNormalRow = (editRow) => {
    this.setState({ editRow: -1 }, () => {
      this.fixColumns();
    });
  }

  render() {
    const { 
      className, 
      rowKey, 
      antdProps, 
      HandleBar, 
      SearchBar, 
      handleBarOptions,
      searchBarOptions,
    } = this.props;

    let props = {
      bordered: true,
      ...antdProps,
      rowKey,
      columns: this.state.columns,
      dataSource: this.state.dataSource,
      loading: !this.state.loaded,
      pagination: this.pagination,
      locale: { emptyText: <Empty /> },
      onChange: (pagination, filters, sorter) => {
        const { current, pageSize } = pagination;
        this.pagination.current = current;
        this.pagination.pageSize = pageSize;
        this.dataLoad();
      }
    }

    return (
      <React.Fragment>
        {HandleBar && <HandleBar listRef={this} />}
        {handleBarOptions && <DefaultHandleBar options={handleBarOptions} listRef={this} />}
        {SearchBar && <SearchBar listRef={this} />}
        {searchBarOptions && <DefaultSearchBar options={searchBarOptions} listRef={this} />}
        <div
          className={classnames({
            ["comp-hz-table-wrapper"]: true,
            [className]: !!className
          })}
        >
          <Table {...props} />
        </div>
      </React.Fragment>
    )
  }
}