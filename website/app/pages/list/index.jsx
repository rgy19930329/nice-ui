/**
 * @desc 页面 - List
 * @author rgy
 * @date 2019-07-25 11:21:40
 */

import React from "react";
// import { Section } from "ky-nice-ui";
import { fetch } from "ky-nice-utils";

export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.dataLoad();
  }

  dataLoad = async () => {
    let result = await fetch("/sug", { code: "utf-8", q: "钱包" });
    const list = result.result || [];
    this.setState({ list });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="page-list-wrapper">
        <h1>List</h1>
        {/* <Section title="推荐列表">
          {list.map((item, index) => {
            return (
              <div key={index}>
                <a href={`#/list/detail/${item[1]}`}>{item[0]}</a>
              </div>
            )
          })}
        </Section> */}

        {list.map((item, index) => {
          return (
            <div key={index}>
              <a href={`#/list/detail/${item[1]}`}>{item[0]}</a>
            </div>
          )
        })}
      </div>
    )
  }
}
