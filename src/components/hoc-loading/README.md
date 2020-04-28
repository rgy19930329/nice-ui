# 组件 - HocLoading

## 功能描述

高阶组件 - 为组件添加数据加载 Loading 效果

## 参数说明

```
mode: "part"（默认）, "cover"
```

## 组件使用

```javascript
import { HocLoading } from "anice-ui";

@HocLoading()
export default class EnumRadio extends React.Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    const { createPromise } = this.props;
    createPromise && this.load(createPromise());
  }

  componentWillReceiveProps(nextProps) {
    const { createPromise } = nextProps;
    if (this.props.promiseCondition !== nextProps.promiseCondition) {
      createPromise && this.load(createPromise());
    }
  }

  load = async (enumPromise) => {
    this.setState({ loaded: false });
    const list = await enumPromise;
    if (list.length > 0) {
      this.setState({ list });
    }
    this.setState({ loaded: true });
  };
}
//
import HocLoading from "anice-ui";

@HocLoading("all")
export default class EnumRadio extends React.Component {
  state = {
    loaded: false,
  };
}
//
import HocLoading from "anice-ui";

class EnumRadio extends React.Component {
  state = {
    loaded: false,
  };
}

export default HocLoading("all")(EnumRadio);
```
