/**
 * @Desc: MarkDown - preview
 * @Author: RGY
 * @Date: 2020-02-26 10:50:44
 */

import React, { PureComponent } from "react";
import { MarkDown, Section } from "ky-nice-ui";

export default class MarkDownPreview extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <h1>MarkDown</h1>

        <Section title="测试一">
          <MarkDown>
            {"```javascript\nfunction(){\n\tconsole.log(123)\n}\n```"}
          </MarkDown>
        </Section>
      </React.Fragment>
    )
  }
}
