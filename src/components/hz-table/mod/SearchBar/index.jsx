/**
 * @Desc 组件 - SearchBar
 * @Author RGY
 * @Date 2019-12-11 13:56:33
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";

import "./index.less";

class SearchBar extends PureComponent {
  static propTypes = {
    listRef: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
      console.log("Received values of form: ", values);
      if (!!error) {
        console.log("Error in Form!!", error);
        return;
      }
      this.props.listRef.dataLoad(values);
    });
  };

  renderForm = () => {
    const {
      form,
      form: { getFieldDecorator },
      options: { conditions = [] },
    } = this.props;

    return conditions.map((item, index) => {
      return (
        <Form.Item label={item.label} key={index}>
          {item.render(getFieldDecorator, form)}
        </Form.Item>
      );
    });
  };

  render() {
    return (
      <div className="comp-search-bar-wrapper">
        <div className="search-bar-buttons">
          <Button type="primary" onClick={this.onSubmit}>
            查询
          </Button>
        </div>
        <div className="search-bar-items">
          <Form layout="inline">{this.renderForm()}</Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(SearchBar);
