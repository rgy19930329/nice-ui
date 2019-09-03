/**
 * @desc 组件 - SearchWrapper
 * @author rgy
 * @date 2019-09-03 15:39:49
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Form, Row, Button, Icon } from "antd";
import isArray from "lodash/isArray";

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
  }

  static defaultProps = {
    formItemLayout: {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    },
    hasHandleBar: true,
    searchText: "查询",
    resetText: "重置",
    defaultRowCount: 2,
  }

  static contextTypes = {
    form: PropTypes.object,
  }

  state = {
    isOpen: false,
  }

  getForm = () => {
    return this.props.form || this.context.form;
  }

  onSearch = () => {
    const { onSearch } = this.props;
    const form = this.getForm();
    const query = form.getFieldsValue();
    console.log(query);
    onSearch && onSearch(query);
  }

  onReset = () => {
    const { onReset } = this.props;
    const form = this.getForm();
    if (onReset) {
      onReset();
    } else {
      form.resetFields();
    }
  }

  hasToggle = () => {
    const { children, defaultRowCount } = this.props;
    let rowCount = React.Children.count(children);
    if (rowCount > defaultRowCount) {
      return true;
    }
    return false;
  }

  getChildren = () => {
    const { isOpen } = this.state;
    const { children, defaultRowCount } = this.props;
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
  }

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
        className={classnames({
          ["comp-search-wrapper"]: true,
          [className]: !!className
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
              <Button
                icon="undo"
                onClick={this.onReset}
              >
                {resetText}
              </Button>
            </Row>
          )}
        </Form>
        {this.hasToggle() && (
          <div className="icon-area">
            <a onClick={() => this.setState({ isOpen: !isOpen })}>
              <Icon type={isOpen ? "up" : "down"} />
            </a>
          </div>
        )}
      </div>
    )
  }
}