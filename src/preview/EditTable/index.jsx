/**
 * @desc 组件演示 - EditTable
 * @author rgy
 * @date 2019-08-16 15:59:24
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import EditTable from "@components/EditTable";

class PreviewEditTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-edit-table-wrapper">
        <h1>EditTable</h1>
        <div className="inner">
          <EditTable />
        </div>
      </div>
    )
  }
}

render(<PreviewEditTable />, document.getElementById("app"));