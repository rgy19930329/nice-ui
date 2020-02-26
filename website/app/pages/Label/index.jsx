/**
 * @Desc: Label - preview
 * @Author: RGY
 * @Date: 2020-02-26 10:39:13
 */

import React, { PureComponent } from "react";
import { Label, Section } from "ky-nice-ui";

export default class LabelPreview extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <h1>Label</h1>

        <Section title="测试一">
          <Label title="title" value="ranguangyu" />
        </Section>
      </React.Fragment>
    )
  }
}
