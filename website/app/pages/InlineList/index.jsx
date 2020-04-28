/**
 * @Desc: InlineList - preview
 * @Author: RGY
 * @Date: 2020-02-26 10:38:08
 */

import React, { PureComponent } from "react";
import { InlineList, Section } from "anice-ui";

export default class InlineListPreview extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1>InlineList</h1>

        <Section title="测试一">
          <InlineList list={["发文", "收文-会议", "收文-案件"]} />
        </Section>

        <Section title="测试二">
          <InlineList
            list={[
              { code: "01", name: "发文" },
              { code: "02", name: "收文-会议" },
              { code: "03", name: "收文-案件" },
            ]}
            split={<a> | </a>}
            render={(item) => `${item.code}.${item.name}`}
          />
        </Section>
      </React.Fragment>
    );
  }
}
