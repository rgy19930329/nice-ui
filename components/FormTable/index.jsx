/**
 * @desc 组件 - FormTable
 * @author rgy
 * @date 2019-08-30 18:00:28
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class FormTable extends React.Component {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={classnames({
          ["comp-form-table-wrapper"]: true,
          [className]: !!className
        })}
      >
        FormTable
      </div>
    )
  }
}