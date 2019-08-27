/**
 * @desc 组件 - ValidateWrapper
 * @author rgy
 * @date 2019-08-27 17:42:46
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class ValidateWrapper extends React.Component {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={classnames({
          ["comp-validate-wrapper-wrapper"]: true,
          [className]: !!className
        })}
      >
        ValidateWrapper
      </div>
    )
  }
}