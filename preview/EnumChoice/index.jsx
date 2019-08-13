/**
 * @desc 组件演示 - EnumChoice
 * @author rgy
 * @date 2019-08-13 22:41:53
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import EnumChoice from "@components/EnumChoice";
import { fetch } from "@utils";

class PreviewEnumChoice extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-enum-choice-wrapper">
        <h1>EnumChoice</h1>
        <div className="inner">
          <div>
            <EnumChoice.Radio
              list={[
                { code: "1", name: "type A" },
                { code: "2", name: "type B" },
              ]}
            />
          </div>
          <div>
            <EnumChoice.Checkbox
              createPromise={() => fetch({
                url: "/example/fruits",
              }).then(res => res.data.list)}
            />
          </div>
        </div>
      </div>
    )
  }
}

render(<PreviewEnumChoice />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}