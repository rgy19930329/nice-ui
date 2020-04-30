/**
 * @desc CellLimit
 * @author ranguangyu
 * @date 2019-9-14
 */

import React from "react";
import { Section, CellLimit } from "anice-ui";

export default class CellLimitPreview extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>CellLimit</h1>

        <Section title="测试一">
          <CellLimit width={200}>
            我的内容很长很长很长很长很长很长很长很长很长
          </CellLimit>
        </Section>
      </React.Fragment>
    );
  }
}
