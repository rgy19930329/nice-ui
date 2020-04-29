/**
 * @desc home
 * @author ranguangyu
 * @date 2019-9-14
 */

import "./index.less";
import React from "react";
import { Badge } from "antd";
import { Section } from "anice-ui";

const req = require.context("@pages", true, /\.jsx$/);
const list = req
  .keys()
  .filter((item) => item.match(/\.\/[^/]+\/[^/]+\.jsx$/))
  .map((item) => item.replace(/^\.\//, "").replace(/\/[^/]+\.jsx$/, ""))
  .filter((item) => item !== "_Home");

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>
          anice-ui 组件库{" "}
          <Badge count={list.length} style={{ backgroundColor: "#52c41a" }} />
        </h1>

        <Section>
          {list.map((item) => {
            return (
              <div key={item}>
                <a href={`#/${item}`}>{item}</a>
              </div>
            );
          })}
        </Section>
      </React.Fragment>
    );
  }
}
