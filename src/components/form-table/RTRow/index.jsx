/**
 * @desc 组件 - RTRow
 * @author rgy
 * @date 2019-09-02 14:27:03
 */

import React from "react";
import PropTypes from "prop-types";
import isArray from "lodash/isArray";

export default class RTRow extends React.Component {
  
  static childContextTypes = {
    siblings: PropTypes.number,
  }

  getChildContext() {
    const { children } = this.props;
    return {
      siblings: this.getChildNumber(children),
    }
  }

  getChildNumber = (children) => {
    return isArray(children) ? children.length : 1;
  }

  render() {
    return (
      <tr className="rt-row">
        {this.props.children}
      </tr>
    )
  }
}
