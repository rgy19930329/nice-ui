/**
 * @desc 组件 - PureField
 * @author rgy
 * @date 2019-09-03 13:39:31
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class PureField extends React.Component {
  static propTypes = {
    transform: PropTypes.func,
  };

  static defaultProps = {
    transform: null,
  };

  render() {
    const { className, value, transform } = this.props;
    return (
      <div
        className={classNames({
          ["nice-pure-field-wrapper"]: true,
          [className]: !!className,
        })}
      >
        {transform ? transform(value) : value}
      </div>
    );
  }
}
