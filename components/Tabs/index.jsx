/**
 * @desc 组件 - Tabs
 * @author rgy
 * @date 2019-08-16 15:33:54
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

export default class CustomTabs extends React.Component {

  static propTypes = {
    panes: PropTypes.array,
  }

  static defaultProps = {
    panes: [],
  }

  render() {
    const { panes, className } = this.props;
    return (
      <div
        className={classnames({
          ["comp-tabs-wrapper"]: true,
          [className]: className
        })}
      >
        <Tabs
          type="card"
          {...this.props}
        >
          {panes && panes.map((item, index) => {
            const { tab, content, key = index } = item;
            return (
              <TabPane tab={tab} key={key}>{content}</TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}