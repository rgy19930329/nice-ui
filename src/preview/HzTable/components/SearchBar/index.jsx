/**
 * @Desc 组件 - SearchBar
 * @Author RGY
 * @Date 2019-12-11 13:56:33
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import EnumSelect from "@components/EnumSelect";

import "./index.less";

export default class SearchBar extends PureComponent {
  
  onChange = (value) => {
    const { listRef } = this.props;
    listRef && listRef.dataLoad({
      facilityCode: value,
    });
  }

  render() {
    return (
      <div className="comp-search-bar-wrapper">
        <span>设施类别：</span>
        <EnumSelect
          style={{width: 200}}
          list={[
            { code: "1", name: "高清监控" },
            { code: "2", name: "人脸卡口" },
            { code: "3", name: "车辆卡口" },
            { code: "4", name: "WIFI探针" },
            { code: "5", name: "人脸门禁" },
            { code: "6", name: "消防感知" },
          ]}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
