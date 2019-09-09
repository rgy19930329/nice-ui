/**
 * @desc 页面 - List
 * @author rgy
 * @date 2019-09-09 11:44:53
 */

import React from "react";
import PageWrapper from "@src/components/PageWrapper";
import Section from "@components/Section";
import RConnect from "@components/RConnect";
import { updateListAction } from "../../stores/list/action";
import { fetch } from "@utils";

@RConnect(
  state => {
    return {
      list: state.list.list,
    }
  },
  { updateList: updateListAction },
)
export default class List extends React.Component {

  constructor(props) {
    super(props);

    console.log(props);
  }

  componentDidMount() {
    this.dataLoad();
  }

  dataLoad = async () => {
    let result = await fetch({
      url: "/example/mock",
    });
    if(result.success) {
			const { projects } = result.data;
      this.props.updateList({ list: projects });
		}
  }

  render() {
    const { list } = this.props;
    return (
      <PageWrapper
        comp="RConnect"
        className="page-r-connect-wrapper"
      >
        <Section title="测试 react-redux 下 RConnect 的使用">
          {list.map(item => {
            return (
              <div key={item.id}>{item.name}</div>
            )
          })}
        </Section>
      </PageWrapper>
    )
  }
}
