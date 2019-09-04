/**
 * @desc 页面 - PageWrapper
 * @author rgy
 * @date 2019-09-04 14:54:23
 */

import "./index.less";
import React from "react";
import classnames from "classnames";
import MarkDown from "@components/MarkDown";
import RotateToggle from "@components/RotateToggle";
import { Icon } from "antd";
import { CSSTransition } from "react-transition-group";

export default class PageWrapper extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {

  }

  render() {
    const { isOpen } = this.state; 
    const { className, children, comp } = this.props;
    return (
      <div
        className={classnames({
          "page-wrapper": true,
          [className]: !!className,
        })}
      >
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="star"
          unmountOnExit
        >
          <div className="markdown">
            <MarkDown>{require(`@components/${comp}/README.md`)}</MarkDown>
          </div>
        </CSSTransition>
        <div className="title">
          <h2>
            <a
              href="/HomePage.html"
              style={{marginRight: 15, verticalAlign: 1}}
            >
              <Icon type="home" />
            </a>
            {comp}
          </h2>
          {isOpen && (
            <a
              className="icon-home"
              href="/HomePage.html"
            >
              <Icon type="home" />
            </a>
          )}
          <a className="icon-qa" onClick={() => this.setState({ isOpen: !isOpen })}>
            <RotateToggle isOpen={isOpen}>
              <Icon type="question-circle" />
            </RotateToggle>
          </a>
        </div>
        <div className="inner">
          {children}
        </div>
      </div>
    )
  }
}
