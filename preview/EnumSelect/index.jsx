/**
 * @desc 组件演示 - EnumSelect
 * @author rgy
 * @date 2019-08-08 15:25:34
 */

import React from "react";
import { render } from "react-dom";
import EnumSelect from "@components/EnumSelect";

class PreviewEnumSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-enum-select-wrapper">
        <h1>EnumSelect</h1>
        <div className="inner">
          <EnumSelect />
        </div>
      </div>
    )
  }
}

render(<PreviewEnumSelect />, document.getElementById("app"));