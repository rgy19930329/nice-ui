/**
 * @desc 组件 - RItem
 * @author rgy
 * @date 2019-09-02 14:26:54
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { getValidateStatus } from "./utils";
import Wrapper from "../Wrapper/index.jsx";
import isArray from "lodash/isArray";

export default class RItem extends React.Component {
  
  static propTypes = {
    label: PropTypes.node,
    required: PropTypes.bool,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valueWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    label: "",
  }

  static contextTypes = {
    max: PropTypes.number,
    siblings: PropTypes.number,
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valueWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    form: PropTypes.object,
  }

  genColSpan = () => {
    const { max, siblings } = this.context;
    let supply = (max * 2 - siblings) / siblings;
    return supply; 
  }

  isRequired = () => {
    const { children, required } = this.props;
    if (required) {
      return true;
    } else {
      if (
        children && 
        typeof children === "object" && 
        children.props &&
        children.props["data-__meta"]
      ) {
        let { rules } = children.props["data-__meta"];
        if (rules) {
          for (let i = 0; i < rules.length; i++) {
            if (rules[i].required) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  getChildField = (child) => {
    if (typeof child !== "object") {
      return child;
    }
    if (!child.props) {
      return child.toString();
    }
    const { form } = this.context;
    let { id } = child.props;
    let field = null;
    if (id) {
      const validateStatus = getValidateStatus(id, form);
      field = (
        <Wrapper
          key={id}
          validateStatus={validateStatus}
        >
          {child}
        </Wrapper>
      )
    } else {
      field = child;
    }
    return field;
  }

  render() {
    const { label, labelWidth, valueWidth, children } = this.props;

    let field = null;
    if (isArray(children)) {
      field = children.map(child => this.getChildField(child));
    } else {
      field = this.getChildField(children);
    }

    return (
      <Fragment>
        <td width={labelWidth || this.context.labelWidth} className="label">
          {this.isRequired()
            ? <i className="star is-required">*</i>
            : <i className="star"></i>
          }
          {label}
        </td>
        <td width={valueWidth || this.context.valueWidth} colSpan={this.genColSpan()}>
          {field}
        </td>
      </Fragment>
    )
  }
}
