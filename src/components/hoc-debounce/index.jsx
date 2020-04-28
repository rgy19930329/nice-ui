/**
 * @desc 组件 - HocDebounce
 * @author rgy
 * @date 2019-08-19 14:49:21
 */

import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import noop from "lodash/noop";
import { getValueFromEvent } from "rc-form/lib/utils";

export default WrappedComponent => class extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    debounceTime: PropTypes.number, // 防抖时间（单位：ms） 
  }

  static defaultProps = {
    onChange: noop,
    debounceTime: 300,
  }

  constructor(props) {
    super(props);

    const { value, debounceTime } = props;

    this.state = {
      value,
    };

    this.debounceChange = debounce(props.onChange, debounceTime);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if (value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = (...args) => {
    const value = getValueFromEvent(...args);

    this.setState({ value });
    this.debounceChange(value);
  }

  render() {
    const { value } = this.state;
    return (
      <WrappedComponent
        {...this.props}
        value={value}
        onChange={this.onChange}
      />
    )
  }
}