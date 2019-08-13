/**
 * @desc 组件 - HOCLoading
 * @author rgy
 * @date 2019-08-13 14:05:54
 */

import React from "react";
import { Spin, Icon } from "antd";

export default mode => WrappedComponent => class extends WrappedComponent {
  render() {
    mode = mode || "part";
    if (mode === "part") {
      return !this.state.loaded ?
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 20 }} spin />}
          spinning={!this.state.loaded}
        /> :
        super.render();
    } else if (mode === "all") {
      return (
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 20 }} spin />}
          spinning={!this.state.loaded}
        >
          {super.render()}
        </Spin>
      )
    } else {
      return super.render();
    }
  }
}
