/**
 * @desc 组件演示 - CellLimit
 * @author rgy
 * @date 2019-08-13 17:17:11
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import CellLimit from "@components/CellLimit";

class PreviewCellLimit extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-cell-limit-wrapper">
        <h1>CellLimit</h1>
        <div className="inner">
          <CellLimit width={120}>fdafasdffdafsdfasdfasdfasdf</CellLimit>
        </div>
      </div>
    )
  }
}

render(<PreviewCellLimit />, document.getElementById("app"));