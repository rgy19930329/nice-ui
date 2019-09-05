/**
 * @desc 组件 - MarkDown
 * @author rgy
 * @date 2019-09-04 13:59:17
 */

import "./assets/github-markdown.css";
import "./assets/github-highlight.css";
import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import hljs from "highlight.js";
import marked from "marked";

hljs.initHighlightingOnLoad();

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

export default class MarkDown extends React.Component {

  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  render() {
    const { className, children = "" } = this.props;
    return (
      <div
        className={classnames({
          ["comp-mark-down-wrapper"]: true,
          ["markdown-body"]: true,
          [className]: !!className
        })}
        dangerouslySetInnerHTML={{ __html: marked(children) }}
      >
      </div>
    )
  }
}