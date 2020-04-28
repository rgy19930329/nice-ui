/**
 * @Desc: HocDebounce - preview
 * @Author: RGY
 * @Date: 2020-02-26 10:16:41
 */

import React, { PureComponent } from "react";
import { Input } from "antd";
import { HocDebounce, Section } from "ky-nice-ui";

const DebounceInput = HocDebounce(Input);

export default class HocDebouncePreview extends PureComponent {
  state = {
    value: "",
  };

  render() {
    return (
      <React.Fragment>
        <h1>HocDebounce</h1>

        <Section title="测试一">
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
          <div style={{ padding: "5px 0 5px 12px" }}>{this.state.value}</div>
        </Section>
      </React.Fragment>
    );
  }
}
