/**
 * @desc 组件演示 - CellLimit
 * @author rgy
 * @date 2019-08-13 17:17:11
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import CellLimit from "@components/CellLimit";
import PageWrapper from "@src/components/PageWrapper";

class PreviewCellLimit extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper
        comp="CellLimit"
        className="page-cell-limit-wrapper"
      >
        <CellLimit width={120}>fdafasdffdafsdfasdfasdfasdf</CellLimit>
      </PageWrapper>
    )
  }
}

render(<PreviewCellLimit />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}