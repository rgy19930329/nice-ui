/**
 * @desc 组件 - withFormInChild
 * @author rgy
 * @date 2019-09-02 11:35:13
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";

export default WrappedComponent => class extends React.Component {

  static childContextTypes = {
    form: PropTypes.object,
  }

  getChildContext() {
    console.log(this.props)
    if (!this.props.form) {
      console.error("this.props.form为undefined，请先创建form");
    }
    return {
      form: this.props.form,
    }
  }

  render() {
    return (
      <WrappedComponent {...this.props} />
    )
  }
}