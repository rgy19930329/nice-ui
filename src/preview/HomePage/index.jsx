/**
 * @desc 页面 - Home
 * @author rgy
 * @date 2019-08-15 17:57:51
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";

const req = require.context("@preview", true, /\.jsx$/);
let navs = req.keys();
navs = navs.filter(item => {
	return item.match(/\.\/[^/]+\/[^/]+\.jsx$/);
}).map(item => item.replace(/^\.\//, "").replace(/\/[^/]+\.jsx$/, ""));
navs = navs.filter(item => item !== "HomePage");

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-home-wrapper">
        <h1>Preview All Components</h1>
        <hr />
        <div>
          {navs && navs.map((item, index) => {
            return (
              <div key={item}>{index + 1}、<a href={`/${item}.html`}>{item}</a></div>
            )
          })}
        </div>
      </div>
    )
  }
}

render(<Home />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
