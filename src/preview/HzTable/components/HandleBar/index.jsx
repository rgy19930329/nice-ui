/**
 * @Desc 组件 - HandleBar
 * @Author RGY
 * @Date 2019-12-11 13:56:25
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";

import "./index.less";

const { Search } = Input;

export default class HandleBar extends PureComponent {
  
  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  onSearch = (value) => {
    const { listRef } = this.props;
    listRef && listRef.dataLoad({ search: value });
  }

  render() {
    return (
      <div className="comp-handle-bar-wrapper">
        <Button
          icon="plus" 
          type="primary" 
          ghost
          style={{marginRight: 10}}
        >
          新增
        </Button>
        <Button 
          icon="minus" 
          type="primary" 
          ghost
          style={{marginRight: 10}}
        >
          删除
        </Button>

        <Search
          placeholder="检索内容"
          onSearch={this.onSearch}
          style={{ width: 200 }}
        />
      </div>
    )
  }
}
