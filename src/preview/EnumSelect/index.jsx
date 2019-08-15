/**
 * @desc 组件演示 - EnumSelect
 * @author rgy
 * @date 2019-08-08 15:25:34
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import EnumSelect from "@components/EnumSelect";
import { fetch } from "@utils";

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
          <EnumSelect
            placeholder="请选择"
            style={{width: 200}}
            createPromise={() => fetch({
              url: "/example/fruits",
            }).then(res => res.data.list)}
          />
        </div>
      </div>
    )
  }
}

render(<PreviewEnumSelect />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}