/**
 * @desc 组件 - SearchWrapper
 * @author rgy
 * @date 2019-09-03 15:39:49
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Form, Row, Col, Button, Icon, Input } from "antd";
import isArray from "lodash/isArray";
import RotateToggle from "../rotate-toggle/index.jsx";

export default class SearchWrapper extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    formItemLayout: PropTypes.object,
    onSearch: PropTypes.func,
    onReset: PropTypes.func,
    hasHandleBar: PropTypes.bool, // 是否有操作行（查询，重置）
    searchText: PropTypes.string,
    resetText: PropTypes.string,
    defaultRowCount: PropTypes.number, // 默认行数，超过默认隐藏
    resetImmediately: PropTypes.bool, // 重置是否立即生效（条件重置之后是否立即查询）,自定义了onReset时该属性失效
    searchs: PropTypes.array, // 二维数组，定义筛选表单
  };

  static defaultProps = {
    formItemLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    },
    hasHandleBar: true,
    searchText: "查询",
    resetText: "重置",
    defaultRowCount: 2,
    resetImmediately: false,
  };

  static contextTypes = {
    form: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    props.setRef && props.setRef(this);
  }

  getForm = () => {
    return this.props.form || this.context.form;
  };

  onSearch = () => {
    const { onSearch } = this.props;
    const form = this.getForm();
    const query = form.getFieldsValue();
    onSearch && onSearch(query);
  };

  onReset = () => {
    const { onReset, resetImmediately } = this.props;
    const form = this.getForm();
    if (onReset) {
      onReset();
    } else {
      form.resetFields();
      if (resetImmediately) {
        this.onSearch();
      }
    }
  };

  hasToggle = () => {
    const { children, defaultRowCount, searchs } = this.props;

    if (searchs) {
      let rowCount = searchs.length;
      if (rowCount > defaultRowCount) {
        return true;
      }
      return false;
    }

    let rowCount = React.Children.count(children);
    if (rowCount > defaultRowCount) {
      return true;
    }
    return false;
  };

  computeSpan = (list) => {
    let max = Math.max(...list.map((row) => row.length));
    if (max == -Infinity) {
      return 8;
    }
    return 24 / max;
  };

  getChildren = () => {
    const { isOpen } = this.state;
    const { children, defaultRowCount, searchs } = this.props;

    if (searchs) {
      const span = this.computeSpan(searchs);
      const form = this.getForm();

      let list = [...searchs];

      if (this.hasToggle() && !isOpen) {
        let rowCount = searchs.length;
        if (rowCount >= defaultRowCount) {
          list = searchs.slice(0, defaultRowCount);
        } else {
          console.error(`参数错误，defaultRowCount不能小于Row行数${rowCount}`);
        }
      }

      return list.map((row, rIdx) => {
        return (
          <Row key={rIdx}>
            {row.map((col, cIdx) => {
              return (
                <Col span={span} key={cIdx}>
                  <Form.Item label={col.label}>
                    {form.getFieldDecorator(col.fname)(
                      ["Input"].includes(col.field.type.name) ? (
                        <Input
                          {...col.field.props}
                          onPressEnter={this.swRef && this.swRef.onSearch}
                        />
                      ) : (
                        col.field
                      )
                    )}
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      });
    }

    if (this.hasToggle() && !isOpen) {
      let rowCount = React.Children.count(children);
      if (rowCount >= defaultRowCount) {
        if (isArray(children)) {
          return children.slice(0, defaultRowCount);
        }
      } else {
        console.error(`参数错误，defaultRowCount不能小于Row行数${rowCount}`);
        return children;
      }
    }
    return children;
  };

  render() {
    const { isOpen } = this.state;
    const {
      className,
      formItemLayout,
      hasHandleBar,
      searchText,
      resetText,
    } = this.props;

    return (
      <div
        className={classNames({
          ["nice-search-wrapper"]: true,
          [className]: !!className,
        })}
      >
        <Form {...formItemLayout}>
          {this.getChildren()}
          {hasHandleBar && (
            <Row style={{ textAlign: "right", marginBottom: 20 }}>
              <Button
                type="primary"
                icon="search"
                onClick={this.onSearch}
                style={{ marginRight: 10 }}
              >
                {searchText}
              </Button>
              <Button icon="undo" onClick={this.onReset}>
                {resetText}
              </Button>
            </Row>
          )}
        </Form>
        {this.hasToggle() && (
          <div className="icon-area">
            <a onClick={() => this.setState({ isOpen: !isOpen })}>
              <RotateToggle isOpen={isOpen}>
                <Icon type={"down"} />
              </RotateToggle>
            </a>
          </div>
        )}
      </div>
    );
  }
}
