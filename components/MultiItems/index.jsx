/**
 * @desc 组件 - MultiItems
 * @author rgy
 * @date 2019-10-09 09:09:52
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Tag } from "antd";

export default class MultiItems extends React.Component {

  static propTypes = {
    codeKey: PropTypes.string,
    labelKey: PropTypes.string,
    closable: PropTypes.bool,
  }

  static defaultProps = {
    codeKey: "code",
    labelKey: "name",
    closable: true,
  }

  render() {
    const {
      className, 
      value, 
      onChange, 
      closable, 
      codeKey, 
      labelKey, 
      onTrigger,
      placeholder,
    } = this.props;
    
    return (
      <div
        className={classnames({
          ["comp-multi-items-wrapper"]: true,
          [className]: !!className
        })}
        onClick={onTrigger}
      >
        <div className="placeholder">
          {(!value || value.length === 0) && (placeholder || "")}
        </div>
        {value && value.map((item, index) => {
          const isSample = (item && typeof item === "object") ? false : true;
          return (
            <Tag
              closable={closable}
              onClose={(e) => {
                e.stopPropagation();
                let list = value.filter((item, idx) => index !== idx);
                onChange && onChange(list);
              }}
              key={isSample ? item : item[codeKey]}
            >
              {isSample ? item : item[labelKey]}
            </Tag>
          )
        })}
      </div>
    )
  }
}