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
import PageWrapper from "@src/components/PageWrapper";

const PLabel = (props) => {
  return (
    <PageWrapper
      comp="Label"
      className="page-label-wrapper"
    >
      <Label {...props} />
      <a href="#/">PLabel</a><br />
      <a href="#/SLabel">SLabel</a>
    </PageWrapper>
  )
}

const SLabel = (props) => {
  console.log(props);
  return (
    <PLabel title="title" value="ranguangyu" />
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