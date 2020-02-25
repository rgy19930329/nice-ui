/**
 * @desc 组件 - withQuery
 * @author rgy
 * @date 2019-09-02 11:35:13
 */

import React from "react";
import { parseUrl } from "./utils";

export default WrappedComponent => class extends React.Component {
  render() {
    const { location: { search } } = this.props;
    const newProps = {
      query: parseUrl(search),
    }
    return (
      <WrappedComponent {...this.props} {...newProps} />
    )
  }
}