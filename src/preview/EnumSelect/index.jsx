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
          placeholder="选择性别"
          style={{ width: 200, marginRight: 20}}
          list={["男", "女"]}
        />

        <EnumSelect
          placeholder="选择岗位"
          style={{ width: 200, marginRight: 20}}
          list={[
            { code: "01", name: "开发" },
            { code: "02", name: "产品" },
            { code: "03", name: "测试" }
          ]}
        />

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