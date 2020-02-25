/**
 * @Desc: {{componentName}} - preview
 * @Author: {{author}}
 * @Date: {{date}}
 */

import React, { PureComponent } from "react";

import { {{componentName}}, Section } from "{{libraryName}}";

export default class {{componentName}}Preview extends PureComponent {

  render() {
    return (
      <React.Fragment>
        <h1>{{componentName}}</h1>

        <Section title="测试一">
          <{{componentName}} />
        </Section>
      </React.Fragment>
      
    )
  }
}
