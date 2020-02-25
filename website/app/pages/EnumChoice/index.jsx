/**
 * @desc 组件演示 - EnumChoice
 * @author rgy
 * @date 2019-08-13 22:41:53
 */

import React from "react";
import { Section, EnumChoice } from "ky-nice-ui";
import { fetch } from "ky-nice-utils";

export default class EnumChoicePreview extends React.Component {
  render() {
    return (
      <React.Fragment>
				<h1>EnumChoice</h1>

				<Section title="EnumChoice.Radio">
          <EnumChoice.Radio
            list={[
              { code: "1", name: "type A" },
              { code: "2", name: "type B" },
            ]}
          />
        </Section>

        <Section title="EnumChoice.Checkbox">
          <EnumChoice.Checkbox
            createPromise={() => fetch({
              url: "/example/fruits",
            }).then(res => res.data.list)}
          />
        </Section>
			</React.Fragment>
    )
  }
}
