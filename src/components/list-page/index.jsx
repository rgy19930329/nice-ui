/**
 * @desc 组件 - ListPage
 * @author rgy
 * @date 2019-10-04 09:40:04
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Table, Empty, Form, Row, Col, Input } from "antd";
import SearchWrapper from "../search-wrapper/index.jsx";
import withFormInChild from "../with-form-in-child/index.jsx";

@Form.create()
@withFormInChild
export default class ListPage extends React.Component {

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

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      loaded: false,
    }

    props.setRef && props.setRef(this);

    this.pagination = {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `共${total}条`,
    }

    let columns = props.columns.map(item => {
      item.key = item.dataIndex;
      return item;
    });

    this.columns = columns;
  }

  componentDidMount() {
    this.dataLoad();
  }

  dataLoad = async () => {
    const { createPromise } = this.props;
    let params = this.fixQueryParams();
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

  fixQueryParams = () => {
    let query = this.props.form.getFieldsValue();
    let { current: pageNumber, pageSize } = this.pagination;
    return Object.assign({}, query, {
      pageNumber,
      pageSize,
    });
  }

  computeSpan = (list) => {
    let max = Math.max(...list.map(row => row.length));
    if (max == -Infinity) {
      return 8;
    }
    return 24 / max;
  }

  renderSearchBar = () => {
    const { createSearchs, form, searchOptions } = this.props;
    if (!createSearchs) {
      return null;
    }
    const list = createSearchs(form);
    const span = this.computeSpan(list);

    return (
      <SearchWrapper
        {...searchOptions}
        onSearch={this.dataLoad}
        setRef={swRef => this.swRef = swRef}
      >
        {
          list && list.map((row, rIdx) => {
            return (
              <Row key={rIdx}>
                {row.map((col, cIdx) => {
                  return (
                    <Col span={span} key={cIdx}>
                      <Form.Item label={col.label}>
                        {form.getFieldDecorator(col.fname)(
                          ["Input"].includes(col.field.type.name)
                            ? <Input {...col.field.props} onPressEnter={this.swRef && this.swRef.onSearch} />
                            : col.field
                        )}
                      </Form.Item>
                    </Col>
                  )
                })}
              </Row>
            )
          })
        }
      </SearchWrapper>
    )
  }

  render() {
    const { className, rowKey, tableProps, createSearchs, extendButtons } = this.props;

    let props = {
      bordered: true,
      ...tableProps,
      rowKey,
      columns: this.columns,
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
      <div
        className={classNames({
          ["comp-list-page-wrapper"]: true,
          [className]: !!className
        })}
      >
        {createSearchs && (
          <div className="list-search-bar">
            {this.renderSearchBar()}
          </div>
        )}
        {extendButtons && (
          <div className="list-extend-buttons">
            {extendButtons}
          </div>
        )}
        <Table {...props} />
      </div>
    )
  }
}