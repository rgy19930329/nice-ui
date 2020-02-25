/**
 * @desc home
 * @author ranguangyu
 * @date 2019-9-14
 */

import "./index.less";
import React from "react";
import { Section, EnumSelect } from "ky-nice-ui";
import { Input } from "antd";

export default class Home extends React.Component {
	render() {
		return (
			<div className="page-home">
				<h1>Welcome to Home</h1>

				<Section title="测试一">
					<EnumSelect
						style={{width: 200}}
						placeholder="请选择"
						list={[
							"2020",
							"2019",
							"2018"
						]}
					/>
				</Section>

				<Section title="测试二">
					<Input style={{width: 200}} />
				</Section>
			</div>
		)
	}
}
