/*
 * @Desc: {{componentName}}
 * @Author: {{author}}
 * @Date: {{date}}
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { HZ_CSS_PREFIX } from "../constant";

export default class {{componentName}} extends PureComponent {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={classNames({
          [HZ_CSS_PREFIX]: true,
          [className]: !!className
        })}
      >
        {{componentName}}
      </div>
    )
  }
}
