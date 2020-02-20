/**
 * @desc 组件 - RConnect
 * @author rgy
 * @date 2019-09-09 09:32:56
 */

import React from "react";
import { connect } from "react-redux";

const createMapDispatchToProps = actions => {
  const mapDispatchToProps = dispatch => {
    let json = {};
    for (let key in actions) {
      let action = actions[key];
      if (typeof action === "function") {
        json[key] = (params) => {
          dispatch(action(params));
        }
      } else {
        json[key] = () => {
          dispatch(action);
        }
      }
    }
    return json;
  }
  return mapDispatchToProps;
}

export default (mapStateToProps, actions) => WrappedComponent => class extends React.Component {
  render() {
    const mapDispatchToProps = createMapDispatchToProps(actions);

    WrappedComponent = connect(
      mapStateToProps,
      mapDispatchToProps,
    )(WrappedComponent);

    return (
      <WrappedComponent {...this.props} />
    )
  }
}