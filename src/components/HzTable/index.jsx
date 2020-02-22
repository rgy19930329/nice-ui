/**
 * @desc 组件 - HzTable
 * @author RGY
 * @date 2019-12-11 13:45:15
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Table, Empty, Form, Input, InputNumber, Modal } from "antd";

import EnumSelect from "../EnumSelect/index.jsx";
import DefaultHandleBar from "./mod/HandleBar/index.jsx";
import DefaultSearchBar from "./mod/SearchBar/index.jsx";
import Ellipsis from "./mod/Ellipsis/index.jsx";
import ValidateWrapper from "./mod/ValidateWrapper/index.jsx";
import { fixEmptyCell, condition } from "./utils";
import { 
  EMPTY_CELL, 
  OPERATE_SPAN,
  VALIDATE_TIPS_TYPE_NORMAL,
  VALIDATE_TIPS_TYPE_POPOVER,
} from "./constant";

export {
  DefaultHandleBar as HandleBar,
  DefaultSearchBar as SearchBar,
  Ellipsis,
  ValidateWrapper,
  fixEmptyCell,
  EMPTY_CELL,
  OPERATE_SPAN,
  VALIDATE_TIPS_TYPE_NORMAL,
  VALIDATE_TIPS_TYPE_POPOVER,
}

@Form.create()
export default class HzTable extends React.Component {

  static propTypes = {
    rowKey: PropTypes.string, // Table 组件的rowKey属性
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

  getChildContext() {
    return {
      form: this.props.form,
    }
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

    // 列表查询参数
    this.query = {};
    // 唯一id
    this.uniqueId = `id-${Date.now()}`;
    // 是否含有操作列
    this.hasOperateColumn = props.columns.filter(item => condition(item)).length > 0;
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

  /**
   * 组装表格列模式
   */
  fixColumns = () => {
    const {
      form,
      form: {
        getFieldDecorator,
      },
      ValidateWrapper,
    } = this.props;

    const FormTips = ValidateWrapper ? ValidateWrapper : Form.Item;

    let columns = this.props.columns.map((item) => {
      item.key = item.dataIndex;
      if (!item.render) {
        item.render = (text) => {
          return fixEmptyCell(text);
        }
      }
      if (this.state.editRow >= 0) {
        if (item.createEditComp) {
          let originRender = item.render;
          delete item.render;

          item.render = (text, record, index) => {
            if (index === this.state.editRow) {
              const renderMap = {
                "function": () => {
                  return (
                    <FormTips>
                      {item.createEditComp({ text, record, index }, form)}
                    </FormTips>
                  )
                },
                "object": () => {
                  let { component, antdProps, options } = item.createEditComp;
                  component = this.renderEditCell(component, antdProps);
                  options = Object.assign({
                    initialValue: text,
                  }, options);

                  return (
                    <FormTips>
                      {getFieldDecorator(item.dataIndex, options)(component)}
                    </FormTips>
                  )
                },
              };
              const type = typeof item.createEditComp;
              return renderMap[type] && renderMap[type]();
            }

            if (item.createNormalComp) {
              return item.createNormalComp(record);
            }

            if (originRender) {
              return originRender(text, record, index);
            }

            return fixEmptyCell(text);
          }
        }
      } else {
        if (item.createNormalComp) {
          item.render = (text, record, index) => {
            return fixEmptyCell(item.createNormalComp(record));
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

    // 加操作列（如果已有，则合并；否则，创建）
    if (this.props.defaultOperate) {
      // 已有、合并
      if (this.hasOperateColumn) {
        columns = columns.map(item => {
          if (condition(item)) {
            item.render = (text, record, index) => {
              return (
                <React.Fragment>
                  {this.renderOperateButtons(text, record, index)}
                  {item.extendRender && item.extendRender(text, record, index)}
                </React.Fragment>
              )
            }
          }
          return item;
        });
      } 
      // 没有、创建
      else {
        columns.push({
          title: "操作",
          dataIndex: this.uniqueId,
          render: (text, record, index) => {
            return this.renderOperateButtons(text, record, index);
          }
        });
      }
    }

    this.setState({ columns });
  }

  /**
   * 渲染操作列按钮
   */
  renderOperateButtons = (text, record, index) => {
    const { updateFunc, deleteFunc } = this.props.defaultOperate;
    const commonProps = {
      style: {
        marginRight: OPERATE_SPAN,
      }
    }

    // 编辑状态 
    if (this.state.editRow === index) {
      return (
        <React.Fragment>
          <a onClick={() => this.onSave(record, updateFunc)} {...commonProps}>保存</a>
          <a onClick={() => this.onCancel(index)} {...commonProps}>取消</a>
        </React.Fragment>
      )
    }
    // 非编辑状态
    else {
      return (
        <React.Fragment>
          {updateFunc && (
            <a onClick={() => this.onEdit(index)} {...commonProps}>编辑</a>
          )}
          {deleteFunc && (
            <a onClick={() => this.onDelete(record, deleteFunc)} {...commonProps}>删除</a>
          )}
        </React.Fragment>
      )
    }
  }

  /**
   * 根据类型渲染可编辑表格
   */
  renderEditCell = (component, antdProps) => {
    let defaultProps = {
      size: "small",
    };

    let composeProps = Object.assign({}, defaultProps, antdProps);

    if (!component || typeof component === "string") {
      let InputView = null;
      switch (component) {
        case "NumberInput":
          InputView = <InputNumber {...composeProps} />;
          break;
        case "EnumSelect":
          InputView = <EnumSelect {...composeProps} />;
          break;
        default:
          InputView = <Input {...composeProps} />;
          break;
      }
      return InputView;
    } else {
      return component;
    }
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

  onEdit = (index) => {
    this.makeEditRow(index);
  }

  onCancel = (index) => {
    this.makeNormalRow(index);
  }

  onDelete = (record, deleteFunc) => {
    Modal.confirm({
      title: "提示",
      content: "是否删除该项？",
      onOk: async () => {
        let result = await deleteFunc(record);
        if (result && result.success) {
          this.dataLoad();
        }
      }
    });
  }

  onSave = (record, updateFunc) => {
    this.props.form.validateFieldsAndScroll(async (error, values) => {
      console.log("Received values of form: ", values);
      if (!!error) {
        console.log("Error in Form!!", error);
        return;
      }
      let params = Object.assign({}, record, values);
      let result = await updateFunc(params);
      if (result && result.success) {
        this.onCancel();
        this.dataLoad();
      }
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
          className={classNames({
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