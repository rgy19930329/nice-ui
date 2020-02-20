/**
 * @desc 页面 - Detail
 * @author rgy
 * @date 2019-08-09 16:21:02
 */

import "./index.less";
import React from "react";
import { fetch } from "ky-nice-utils";

export default class Detail extends React.Component {

  constructor(props) {
    super(props);

    const {
      match: {
        params: { f }
      }
    } = props;

    this.state = {
      data: [],
      f,
    }
  }

  componentDidMount() {
    this.dataLoad();
  }

  dataLoad = async () => {
    let result = await fetch("/sug", { code: "utf-8", q: "钱包" });
    let r = result.result.filter(item => item[1] == this.state.f);
    if (r.length > 0) {
      this.setState({ data: r[0] });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="page-detail-wrapper">
        <h1>Detail</h1>
        <div>
          <div>{data[0]}</div>
          <div>{data[1]}</div>
        </div>
      </div>
    )
  }
}
