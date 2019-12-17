/**
 * @desc 组件 - withLocale
 * @author rgy
 * @date 2019-10-04 11:39:12
 */

import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale-provider/zh_CN";

console.log(zhCN)

export default WrappedComponent => class extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <WrappedComponent {...this.props}/>
      </ConfigProvider>
    )
  }
}