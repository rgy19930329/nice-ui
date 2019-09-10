/**
 * @desc 组件 - RUpload
 * @author rgy
 * @date 2019-09-10 14:53:45
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Upload, Button, Icon, message, Spin } from "antd";

export default class RUpload extends React.Component {

  static propTypes = {
    value: PropTypes.array,
    maxSize: PropTypes.number, // 文件最大多少M
    maxNumber: PropTypes.number, // 文件最多上传多少个
    readOnly: PropTypes.bool, // 是否只读模式
    text: PropTypes.node, // 上传按钮区内容
    uploadProps: PropTypes.object, // antd Upload 上传属性
    tips: PropTypes.object, // 信息提示器
    transform: PropTypes.func, // 转换 response 数据（返回数据结构：{ id(必选), name(必选), url(可选) }）
  }

  static defaultProps = {
    maxSize: 10, // 10M
    maxNumber: 5, // 5个
    readOnly: false, // 可编辑状态
    text: "文件上传",
    uploadProps: {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      beforeUpload: (file) => true,
    },
    tips: message,
    transform: (file) => file,
  }

  constructor(props) {
    super(props);

    this.state = {
      fileList: props.value || [],
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ fileList: nextProps.value });
    }
  }

  /**
   * 文件校验
   */
  checkFile = (file) => {
    const { maxSize, tips } = this.props;
    if (file && file.size > maxSize * 1024 * 1024) {
      tips.error(`请不要上传大于${maxSize}M的文件`);
      return false;
    } else if (file.name.indexOf(",") !== -1) {
      tips.error(`上传文件名不能带（，）`);
      return false;
    }
    return true;
  }

  /**
   * 删除文件
   */
  onRemove = (file) => {
    const { onChange } = this.props;
    let { fileList } = this.state;
    fileList = fileList.filter(item => item.id !== file.id);
    this.setState({ fileList });
  }

  render() {
    const {
      className,
      maxNumber,
      readOnly,
      text,
      uploadProps,
      tips,
      transform,
      onChange,
    } = this.props;

    const { fileList, loading } = this.state;

    const props = {
      ...uploadProps,
      name: "file",
      showUploadList: false,
      beforeUpload: (file) => {
        return this.checkFile(file) && uploadProps.beforeUpload(file);
      },
      onChange: (info) => {
        if (info.file.status === "uploading") {
          this.setState({ loading: true });
        } else {
          let { fileList } = this.state;
          fileList.push(transform(info.file.response));
          this.setState({ loading: false, fileList });
          onChange && onChange(fileList);
        }
        if (info.file.status === "done") {
          tips.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === "error") {
          tips.error(`${info.file.name} 上传失败`);
        }
      },
    };

    return (
      <div
        className={classnames({
          ["comp-r-upload-wrapper"]: true,
          [className]: !!className
        })}
      >
        <Upload {...props}>
          {!readOnly && fileList.length < maxNumber && (
            <Button>
              <Icon type={loading ? "loading" : "upload"} /> {text}
            </Button>
          )}
        </Upload>
        <div className="r-upload-list">
          {fileList.map((file, index) => {
            const { id, name, url } = file;
            return (
              <div className="upload-item" key={id || index}>
                <Icon type="paper-clip" />
                {url
                  ? (
                    <a href={url} target="_blank">{name}</a>
                  )
                  : name
                }
                <Icon type="close" onClick={() => this.onRemove(file)} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}