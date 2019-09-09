/**
 * @desc 组件演示 - RConnect
 * @author rgy
 * @date 2019-09-09 09:32:56
 */

import "./index.less";
import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores";
import List from "./pages/list";

class PreviewRConnect extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Route path="/" exact component={List}></Route>
            <Route path="/list" exact component={List}></Route>
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

render(<PreviewRConnect />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}