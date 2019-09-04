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
import PageWrapper from "@src/components/PageWrapper";

class PreviewEnumSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="EnumSelect"
        className="page-enum-select-wrapper"
      >
        <EnumSelect
          placeholder="请选择"
          style={{ width: 200 }}
          createPromise={() => fetch({
            url: "/example/fruits",
          }).then(res => res.data.list)}
        />
      </PageWrapper>
    )
  }
}

render(<PreviewEnumSelect />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}