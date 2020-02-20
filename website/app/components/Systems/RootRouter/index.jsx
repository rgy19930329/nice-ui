/**
 * 根路由组件
 * @author ranguangyu
 * @date 2019-8-9
 */

import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import routes from "@components/Systems/router";
import NotFound from "@components/Systems/NotFound";

@withRouter
class RootRouter extends React.Component {
  render() {
    const location = this.props.location;
    return (
      <div>
        <div style={{padding: 15}}>
          <Switch location={location}>
            {routes.map(({ name, path, exact = true, component }) => {
              return (
                <Route key={name} path={path} exact={exact} component={component} />
              )
            })}
            {/* <Redirect from="/" exact to="/home" /> */}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default RootRouter;