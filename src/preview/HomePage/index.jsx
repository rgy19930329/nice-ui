/**
 * @desc 页面 - Home
 * @author rgy
 * @date 2019-08-15 17:57:51
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { Input } from "antd";

const req = require.context("@preview", true, /\.jsx$/);
let navs = req.keys();
navs = navs.filter(item => {
	return item.match(/\.\/[^/]+\/[^/]+\.jsx$/);
}).map(item => item.replace(/^\.\//, "").replace(/\/[^/]+\.jsx$/, ""));
navs = navs.filter(item => item !== "HomePage");

/**
 * 数据补位
 * @param {*} num 
 * @param {*} max 
 * @return {String}
 */
const makeFill = (num, max = 2) => {
  if (typeof max !== "number") {
    max = String(max.length).length;
  }
  let s = "";
  for (let i = 0; i < max - String(num).length; i++) {
    s += "0";
  }
  return s + num;
}

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      list: navs,
    }
  }

  componentDidMount() {

  }

  render() {
    let { value, list } = this.state; 
    return (
      <div className="page-home-wrapper">
        <h1>Preview All Components</h1>
        <hr />
        <div style={{marginBottom: 10}}>
          <Input
            placeholder="组件搜索"
            style={{width: 200}}
            value={value}
            onChange={(e) => {
              let value = e.target.value;
              if (value) {
                list = list.filter(item => item.match(new RegExp(value, "i")));
              } else {
                list = navs;
              }
              this.setState({
                value,
                list,
              });
            }}
          />
        </div>
        <div>
          {list && list.map((item, index) => {
            return (
              <div key={item}>{makeFill(index + 1, list)}、<a href={`/${item}.html`}>{item}</a></div>
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
