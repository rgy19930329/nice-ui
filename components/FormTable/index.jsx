/**
 * @desc 组件 - FormTable
 * @author rgy
 * @date 2019-08-30 18:00:28
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import RTRow from "./RTRow";
import RItem from "./RItem";
import isArray from "lodash/isArray";

class FormTable extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    labelWidth: "20%",
  }

  static childContextTypes = {
    max: PropTypes.number,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valueWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    form: PropTypes.object,
  }

  getChildContext() {
    const { children, labelWidth, form } = this.props;
    let max = 1;
    if (isArray(children)) {
      let list = children.map(item => {
        return isArray(item.props.children) ? item.props.children.length : 1;
      });
      max = Math.max.apply(null, list);
    } else {
      max = isArray(children.props.children) ? children.props.children.length : 1;
    }

    let valueWidth = labelWidth;
    if (typeof labelWidth === "string" && labelWidth.match(/%$/)) {
      let ap = 100 / max;
      let lp = parseInt(labelWidth);
      let vp = Math.ceil(ap - lp);
      valueWidth = `${vp}%`;
    }

    return {
      max,
      labelWidth,
      valueWidth,
      form,
    }
  }

  render() {
    const { className, children } = this.props;
    return (
      <table
        className={classNames({
          ["comp-form-table-wrapper"]: true,
          [className]: !!className
        })}
      >
        <tbody>
          {children}
        </tbody>
      </table>
    )
  }
}

FormTable.RTRow = RTRow;
FormTable.RItem = RItem;

export default FormTable;