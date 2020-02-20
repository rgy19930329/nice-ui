/**
 * @desc home
 * @author ranguangyu
 * @date 2019-9-14
 */

import "./index.less";
import React from "react";
import { Section } from "ky-nice-ui";

export default class Home extends React.Component {
	render() {
		return (
			<div className="page-home">
				<h1>Welcome to Home</h1>

				<Section title="测试一">
					test
				</Section>
			</div>
		)
	}
}
