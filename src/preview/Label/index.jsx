/**
 * @desc 页面 - PreviewLabel
 * @author rgy
 * @date 2019-08-07 14:05:18
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Label from "@components/Label";

const PLabel = (props) => {
  return (
    <div className="page-label-wrapper">
      <h1>Label</h1>
      <div className="inner">
        <Label />
      </div>
    </div>
  )
}

const SLabel = (props) => {
  let newProps = Object.assign({}, props, {
    query: {
      name: "rgy",
    }
  });
  console.log(newProps);
  return (
    <PLabel {...newProps} />
  );
}

class PreviewLabel extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={PLabel}></Route>
          <Route path="/SLabel" exact component={SLabel}></Route>
        </div>
      </HashRouter>
    )
  }
}

render(<PreviewLabel />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}