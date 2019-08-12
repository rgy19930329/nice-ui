/**
 * @desc 组件演示 - RichText
 * @author rgy
 * @date 2019-08-12 10:08:10
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import RichText from "@components/RichText";

class PreviewRichText extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-rich-text-wrapper">
        <h1>RichText</h1>
        <div className="inner">
          <RichText />
        </div>
      </div>
    )
  }
}

render(<PreviewRichText />, document.getElementById("app"));