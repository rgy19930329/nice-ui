/**
 * @Desc: Section - preview
 * @Author: RGY
 * @Date: 2020-02-26 15:08:18
 */

import React, { PureComponent } from "react";
import { Section } from "anice-ui";

export default class SectionPreview extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1>Section</h1>

        <Section title="测试一" iconType="power">
          测试测试测试测试测试
        </Section>
      </React.Fragment>
    );
  }
}
