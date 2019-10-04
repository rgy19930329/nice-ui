/**
 * @desc 组件 - WithLocale
 * @author rgy
 * @date 2019-10-04 11:39:12
 */

import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

export default WrappedComponent => class extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <WrappedComponent {...this.props}/>
      </ConfigProvider>
    )
  }
}