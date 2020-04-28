/**
 * @desc 组件 - RCheckbox
 * @author rgy
 * @date 2019-09-17 16:43:41
 */

import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

export default class RCheckbox extends React.Component {
  static propTypes = {
    map: PropTypes.object, // 映射表
  };

  static defaultProps = {
    map: null,
  };

  render() {
    const { value, onChange, map, children } = this.props;
    if (!map) {
      return <Checkbox {...this.props}>{children}</Checkbox>;
    }
    return (
      <Checkbox
        {...this.props}
        checked={map[value]}
        onChange={(e) => {
          let checked = e.target.checked;
          let value = false;
          for (let key in map) {
            if (map[key] === checked) {
              value = key;
            }
          }
          onChange && onChange(value);
        }}
      >
        {children}
      </Checkbox>
    );
  }
}
