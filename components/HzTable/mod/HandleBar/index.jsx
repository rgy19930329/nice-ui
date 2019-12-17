/**
 * @Desc 组件 - HandleBar
 * @Author RGY
 * @Date 2019-12-11 13:56:25
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

export default class HandleBar extends PureComponent {

  static propTypes = {
    listRef: PropTypes.object.isRequired,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    const {
      options: {
        searchOptions,
      }
    } = props;

    this.defaultHandleOptions = {
      gutter: 16,
      elements: [],
    }

    this.defaultSearchOptions = {
      show: true, // 是否展示
      searchKey: "search", // 搜索区参数字段配置
      antdProps: {
        placeholder: "检索内容",
        style: {
          width: 240
        }
      }
    }

    this.composeSearchOptions = Object.assign({}, this.defaultSearchOptions, searchOptions);
  }

  onSearch = (value) => {
    const { searchKey } = this.composeSearchOptions;
    this.props.listRef.dataLoad({ [searchKey]: value });
  }

  onChange = (e) => {
    const { searchKey } = this.composeSearchOptions;
    this.props.listRef.updateQuery({ [searchKey]: e.target.value });
  }

  renderElements = () => {
    const {
      options: {
        handleOptions,
      }
    } = this.props;

    const elementMap = {
      "button": (props) => {
        return (
          <Button
            type="primary"
            ghost
            {...props.antdProps}
          />
        )
      },
      "custom": (props) => {
        return props.render();
      }
    }

    const { gutter, elements } = Object.assign({}, this.defaultHandleOptions, handleOptions);

    return elements.map((element, index) => {
      const {
        elementType = "button",
        antdProps = {},
        render = () => null,
      } = element;
      return elementMap[elementType]
        ? (
          <span style={{ marginRight: gutter }} key={index}>
            {elementMap[elementType]({
              antdProps,
              render,
            })}
          </span>
        )
        : `[暂不支持${elementType}组件类型扩展]`;
    });
  }

  renderSearch = () => {
    const {
      options: {
        searchOptions,
      }
    } = this.props;
    const { show, antdProps } = Object.assign({}, this.defaultSearchOptions, searchOptions);

    return (
      show && (
        <Input.Search
          {...antdProps}
          onSearch={this.onSearch}
          onChange={this.onChange}
        />
      )
    )
  }

  render() {
    const { listRef } = this.props;

    if (!listRef) {
      return "listRef 参数为能为空";
    }

    return (
      <div className="hz-layout-vertical-md-divider hz-table-actions">
        <div className="actions-btns">
          {this.renderElements()}
        </div>
        <div className="actions-search">
          {this.renderSearch()}
        </div>
      </div>
    )
  }
}
