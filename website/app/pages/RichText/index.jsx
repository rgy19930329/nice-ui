/**
 * @Desc: RichText - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:23:55
 */

import React, { PureComponent } from "react";
import { RichText, Section } from "ky-nice-ui";

export default class RichTextPreview extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <h1>RichText</h1>

        <Section title="测试一">
          <RichText />
        </Section>
      </React.Fragment>
    )
  }
}
