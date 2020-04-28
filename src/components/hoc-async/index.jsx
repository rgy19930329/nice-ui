/**
 * @desc 组件 - HocAsync
 * @author rgy
 * @date 2019-08-13 13:58:31
 */

import React from "react";

export default importComponent => class extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    if (this.hasLoadedComponent()) {
      return;
    }
    const { default: component } = await importComponent();
    this.setState({
      component: component
    });
  }

  hasLoadedComponent() {
    return this.state.component !== null;
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  }

  render() {
    const C = this.state.component;

    return C ? <C {...this.props} /> : null;
  }
}