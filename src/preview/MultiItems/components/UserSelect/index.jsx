/**
 * @desc 组件 - UserSelect
 * @author rgy
 * @date 2019-10-09 18:07:52
 */

import "./index.less";
import React from "react";
import MultiItems from "@components/MultiItems";
import ConnectedModal from "../ConnectedModal";

export default class UserSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <div className="comp-user-select-wrapper">
        <MultiItems
          value={value}
          onChange={onChange}
          placeholder="请选择用户"
          onTrigger={() => {
            this.connectRef.open();
          }}
          style={{width: 300}}
        />
        <ConnectedModal
          setRef={connectRef => this.connectRef = connectRef}
          onChange={(value) => {
            value = value.map(item => {
              return {
                code: item.bid,
                name: item.name,
              }
            });
            onChange && onChange(value);
          }}
        />
      </div>
    )
  }
}
