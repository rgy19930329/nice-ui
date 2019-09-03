/**
 * @desc 组件演示 - withQuery
 * @author rgy
 * @date 2019-09-02 11:35:13
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import User from "./pages/user";

const Home = (props) => {
  return (
    <div className="page-with-query-wrapper">
      <h1>withQuery</h1>
      <div className="inner">
        <a href={`#/user?title=title&value=ranguangyu`}>User</a>
      </div>
    </div>
  )
}

class PreviewwithQuery extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={Home}></Route>
          <Route path="/user" exact component={User}></Route>
        </div>
      </HashRouter>
    )
  }
}

render(<PreviewwithQuery />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}