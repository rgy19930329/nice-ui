/**
 * @desc 组件演示 - RotateToggle
 * @author rgy
 * @date 2019-09-03 18:27:17
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import RotateToggle from "@components/RotateToggle";
import Section from "@components/Section";
import { Icon } from "antd";

class PreviewRotateToggle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpen2: false,
    }
  }

  componentDidMount() {

  }

  render() {
    const { isOpen, isOpen2 } = this.state;
    return (
      <div className="page-rotate-toggle-wrapper">
        <h1>RotateToggle</h1>
        <div className="inner">
          <Section title="测试一：盒子开关 180deg">
            <div className="icon-area">
              <a onClick={() => this.setState({ isOpen: !isOpen })}>
                <RotateToggle isOpen={isOpen}>
                  <Icon type={"up"} />
                </RotateToggle>
              </a>
            </div>
          </Section>
          <Section title="测试二：目录开关 90deg">
            <a onClick={() => this.setState({ isOpen2: !isOpen2 })} style={{fontSize: 24}}>
              <RotateToggle
                isOpen={isOpen2}
                rotate={[0, 90]}
              >
                <Icon type="caret-right" />
              </RotateToggle>
            </a>
          </Section>
        </div>
      </div>
    )
  }
}

render(<PreviewRotateToggle />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}