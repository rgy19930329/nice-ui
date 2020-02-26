/**
 * @Desc: withFormInChild - preview
 * @Author: RGY
 * @Date: 2020-02-26 15:19:14
 */

import React, { PureComponent } from "react";
import { withFormInChild, Section } from "ky-nice-ui";

export default class withFormInChildPreview extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <h1>withFormInChild</h1>

        <Section title="测试一">
          高阶组件，无法演示
        </Section>
      </React.Fragment>
    )
  }
}
