/**
 * @desc 组件 - EnumSelect
 * @author rgy
 * @date 2019-08-08 15:25:34
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Select } from "antd";
import debounce from "lodash.debounce";

const Option = Select.Option;

let cache = {}; // 缓存数据

export default class EnumSelect extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.any,
    list: PropTypes.array, // 数据源列表
    codeKey: PropTypes.string, // code 键名
    labelKey: PropTypes.string, // label 键名
    createPromise: PropTypes.func, // 传入一个生成promise的函数
    promiseCondition: PropTypes.string, // promise重复触发条件标识
    hasAll: PropTypes.bool, // 是否支持选择"全部"
    hasAllText: PropTypes.string, // hasAll为true时，默认文案，默认为"不限"
    showSearch: PropTypes.bool, // 是否支持搜索
    searchPromise: PropTypes.func, // 传入一个生成search promise的函数
    searchDelay: PropTypes.number, // 搜索时的等待输入时间（毫秒）
    readOnly: PropTypes.bool, // 是否只读
    cacheKey: PropTypes.string, // 下拉数据缓存 键名
    render: PropTypes.func, // 复杂项渲染
  };

  static defaultProps = {
    list: [],
    codeKey: "code",
    labelKey: "name",
    hasAll: false,
    promiseCondition: "",
    showSearch: false,
    searchPromise: () => new Promise((resolve) => resolve([])),
    searchDelay: 500,
    style: {
      width: "100%",
    },
    hasAllText: "全部",
  };

  state = {
    searching: false,
  };

  constructor(props) {
    super(props);
    this.doSearch = debounce(this.doSearch, props.searchDelay);
  }

  componentDidMount() {
    const { createPromise, cacheKey } = this.props;
    if (cacheKey) {
      if (!cache[cacheKey]) {
        cache[cacheKey] = true;
        if (createPromise) {
          this.load(createPromise());
        }
      }
      const timer = setInterval(() => {
        if (
          Object.prototype.toString.call(cache[cacheKey]) === "[object Array]"
        ) {
          this.setState({ list: cache[cacheKey] });
          clearInterval(timer);
        }
      }, 100);
    } else {
      if (createPromise) {
        this.load(createPromise());
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { promiseCondition } = this.props;
    const { createPromise } = nextProps;
    if (promiseCondition !== nextProps.promiseCondition) {
      if (createPromise) {
        this.load(createPromise());
      }
    }
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  load = async (enumPromise) => {
    const { cacheKey } = this.props;
    const list = await enumPromise;
    if (
      Object.prototype.toString.call(list) === "[object Array]" &&
      list.length > 0
    ) {
      this.setState({ list });
      if (cacheKey) {
        cache[cacheKey] = list;
      }
    } else {
      this.setState({ list: [] });
    }
  };

  /**
   * 组装搜索props
   */
  fixSearchProps = () => {
    const { searching } = this.state;
    const { showSearch } = this.props;
    this.searchProps = {};
    if (showSearch) {
      this.searchProps = {
        filterOption: false,
        onSearch: this.doSearch,
        loading: searching,
      };
    }
  };

  /**
   * 执行搜索
   */
  doSearch = async (value) => {
    if (!value) {
      return;
    }
    const { searchPromise } = this.props;
    if (searchPromise) {
      this.setState({ searching: true });
      const list = await searchPromise(value);
      this.setState({
        list,
        searching: false,
      });
    }
  };

  render() {
    const { list: slist } = this.state;
    const { list: plist } = this.props;
    const {
      className,
      codeKey,
      labelKey,
      hasAll,
      hasAllText,
      readOnly,
      value,
      render,
    } = this.props;
    const list = slist || plist || [];

    if (readOnly) {
      const t = list.filter((item) => item[codeKey] === value);
      if (render) {
        return render(t[0]);
      }
      if (t.length > 0) {
        return t[0][labelKey];
      }
      return "";
    }

    const options = list.map((item, index) => {
      if (typeof item !== "object") {
        if (render) {
          return (
            <Option value={item} key={`option-${index}`}>
              {render(item)}
            </Option>
          );
        }
        return (
          <Option value={item} key={`option-${index}`}>
            {item}
          </Option>
        );
      }
      if (render) {
        return (
          <Option value={item[codeKey]} key={`option-${item[codeKey]}`}>
            {render(item)}
          </Option>
        );
      }
      return (
        <Option value={item[codeKey]} key={`option-${item[codeKey]}`}>
          {item[labelKey]}
        </Option>
      );
    });
    this.fixSearchProps();
    const cls = classNames({
      ["nice-enum-select-wrapper"]: true,
      [className]: !!className,
    });
    const props = {
      ...this.props,
      ...this.searchProps,
      className: cls,
    };
    return hasAll ? (
      <Select {...props}>
        <Option value="">{hasAllText}</Option>
        {options}
      </Select>
    ) : (
      <Select {...props}>{options}</Select>
    );
  }
}
