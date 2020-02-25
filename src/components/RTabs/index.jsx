/**
 * @desc 组件 - RTabs
 * @author rgy
 * @date 2019-08-16 15:33:54
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

export default class RTabs extends React.Component {

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
        className={classNames({
          ["comp-tabs-wrapper"]: true,
          [className]: !!className
        })}
      >
        <Tabs
          type="line"
          {...this.props}
        >
          {panes && panes.map((item, index) => {
            const { tab, content, key = index, forceRender = false } = item;
            return (
              <TabPane tab={tab} key={key} forceRender={forceRender}>{content}</TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}