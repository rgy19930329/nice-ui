/**
 * @desc 组件演示 - HOCDebounce
 * @author rgy
 * @date 2019-08-19 14:49:21
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { Input } from "antd";
import HOCDebounce from "@components/HOCDebounce";
import PageWrapper from "@src/components/PageWrapper";

const DebounceInput = HOCDebounce(Input);

class PreviewHOCDebounce extends React.Component {

  state = {
    value: "",
  };

  render() {
    return (
      <PageWrapper
        comp="HOCDebounce"
        className="page-h-o-c-debounce-wrapper"
      >
        <DebounceInput
          style={{ width: 300 }}
          placeholder="请输入关键字进行搜索"
          value={this.state.value}
          onChange={(value) => {
            console.log(value);
            this.setState({ value });
          }}
          debounceTime={1000}
        />
        <div style={{ padding: "5px 0 5px 12px" }}>
          {this.state.value}
        </div>
      </PageWrapper>
    )
  }
}

render(<PreviewHOCDebounce />, document.getElementById("app"));