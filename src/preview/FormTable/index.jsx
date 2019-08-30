/**
 * @desc 组件演示 - FormTable
 * @author rgy
 * @date 2019-08-30 18:00:28
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import FormTable from "@components/FormTable";

class PreviewFormTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-form-table-wrapper">
        <h1>FormTable</h1>
        <div className="inner">
          <FormTable />
        </div>
      </div>
    )
  }
}

render(<PreviewFormTable />, document.getElementById("app"));