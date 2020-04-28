/**
 * @Desc: RotateToggle - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:24:53
 */

import React, { PureComponent } from "react";
import { Icon } from "antd";
import { RotateToggle, Section } from "anice-ui";

export default class RotateTogglePreview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpen2: false,
    };
  }

  render() {
    const { isOpen, isOpen2 } = this.state;

    return (
      <React.Fragment>
        <h1>RotateToggle</h1>

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
          <a
            onClick={() => this.setState({ isOpen2: !isOpen2 })}
            style={{ fontSize: 24 }}
          >
            <RotateToggle isOpen={isOpen2} rotate={[0, 90]}>
              <Icon type="caret-right" />
            </RotateToggle>
          </a>
        </Section>
      </React.Fragment>
    );
  }
}
