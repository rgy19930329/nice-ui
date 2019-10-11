/**
 * @desc 组件 - MultiItems
 * @author rgy
 * @date 2019-10-09 09:09:52
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Tag, Icon } from "antd";

const CloseSvg = () => (
  <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
)

const CloseIcon = (props) => (
  <Icon
    component={CloseSvg} 
    {...props}
  />
)

export default class MultiItems extends React.Component {

  static propTypes = {
    codeKey: PropTypes.string,
    labelKey: PropTypes.string,
    closable: PropTypes.bool,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    codeKey: "code",
    labelKey: "name",
    closable: true,
    readOnly: false,
  }

  render() {
    const {
      style,
      className, 
      value, 
      onChange, 
      closable, 
      codeKey, 
      labelKey, 
      onTrigger,
      placeholder,
      readOnly,
    } = this.props;
    
    return (
      <div
        style={style}
        className={classnames({
          ["comp-multi-items-wrapper"]: true,
          [className]: !!className,
          ["comp-read-only"]: readOnly
        })}
        onClick={() => {
          if (!readOnly) {
            onTrigger();
          }
        }}
      >
        <div className="placeholder">
          {(!value || value.length === 0) && (placeholder || "")}
        </div>
        {value && value.map((item, index) => {
          const isSample = (item && typeof item === "object") ? false : true;
          return (
            <Tag
              closable={readOnly ? false : closable}
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
        {!readOnly && value && value.length > 0 && (
          <a
            className="icon-close"
            onClick={(e) => {
              e.stopPropagation();
              onChange && onChange([]);
            }}
          >
            <CloseIcon />
          </a>
        )}
      </div>
    )
  }
}