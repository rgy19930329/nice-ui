/**
 * @desc 组件 - withFormInChild
 * @author rgy
 * @date 2019-09-02 17:13:03
 */

import React from "react";
import PropTypes from "prop-types";

export default (WrappedComponent) =>
  class extends React.Component {
    static childContextTypes = {
      form: PropTypes.object,
    };

    getChildContext() {
      if (!this.props.form) {
        console.error("this.props.form为undefined，请先创建form");
      }
      return {
        form: this.props.form,
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
