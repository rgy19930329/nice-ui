/**
 * @desc 组件 - EnumSelect
 * @author rgy
 * @date 2019-08-08 15:25:34
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class EnumSelect extends React.Component {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  render() {
    const className = classnames({
      ["comp-enum-select-wrapper"]: true,
    });
    return (
      <div className={className}>
        EnumSelect
      </div>
    )
  }
}