/**
 * @desc 组件演示 - EnumSelect
 * @author rgy
 * @date 2019-08-08 15:25:34
 */

import React from "react";
import { Section, EnumSelect } from "anice-ui";
import { fetch } from "ky-nice-utils";

export default class EnumSelectPreview extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>EnumSelect</h1>

        <Section title="测试一">
          <EnumSelect
            placeholder="选择性别"
            style={{ width: 200, marginRight: 20 }}
            list={["男", "女"]}
          />

          <EnumSelect
            placeholder="选择岗位"
            style={{ width: 200, marginRight: 20 }}
            list={[
              { code: "01", name: "开发" },
              { code: "02", name: "产品" },
              { code: "03", name: "测试" },
            ]}
          />

          <EnumSelect
            placeholder="请选择"
            style={{ width: 200 }}
            createPromise={() =>
              fetch({
                url: "/example/fruits",
              }).then((res) => res.data.list)
            }
          />
        </Section>
      </React.Fragment>
    );
  }
}
