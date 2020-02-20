# 组件 - RConnect

需要安装 redux + react-redux

RConnect 紧紧用于代替 react-redux 中的 connect 组件，其余部分使用方法与react-redux一致

## 功能描述

> 高阶组件 - 帮助使用react-redux时简化使用方式

## 参数说明

```javascript
@RConnect(
  mapStateToProps,
  actions,
)
```

## 组件使用

action.js

```js
const updateListAction = (params) => {
  return {
    type: "updateList",
    params,
  }
}

export {
  updateListAction,
}
```

reducer.js

```js
const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "updateList":
      return Object.assign({}, state, {
        list: action.params.list,
      });
    default:
      return state;
  }
}
```

demo

```javascript
import { RConnect } from "ky-nice-ui";
import { updateListAction } from "../../stores/list/action";

@RConnect(
  state => {
    return {
      list: state.list.list,
    }
  },
  { updateList: updateListAction },
)
export default class List extends React.Component {

  componentDidMount() {
    this.dataLoad();
  }

  dataLoad = async () => {
    let result = await fetch({
      url: "/example/mock",
    });
    if (result.success) {
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
```