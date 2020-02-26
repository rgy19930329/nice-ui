/**
 * @Desc: RTabs - preview
 * @Author: RGY
 * @Date: 2020-02-26 14:28:16
 */

import React, { PureComponent } from "react";
import { RTabs, Section } from "ky-nice-ui";

export default class RTabsPreview extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <h1>RTabs</h1>

        <Section title="测试一">
          <RTabs
            defaultActiveKey="1"
            panes={[
              {
                tab: "原生表单",
                key: "1",
                content: <div>原生表单</div>
              },
              {
                tab: "配置表单",
                key: "2",
                content: <div>配置表单</div>
              }
            ]}
          />
        </Section>
      </React.Fragment>
    )
  }
}
