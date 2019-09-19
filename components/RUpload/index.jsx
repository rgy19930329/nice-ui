/**
 * @desc 组件 - RUpload
 * @author rgy
 * @date 2019-09-10 14:53:45
 */

import "./index.less";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Upload, Button, Icon, message } from "antd";

export default class RUpload extends React.Component {

  static propTypes = {
    value: PropTypes.array,
    maxSize: PropTypes.number, // 文件最大多少M
    maxNumber: PropTypes.number, // 文件最多上传多少个
    readOnly: PropTypes.bool, // 是否只读模式
    text: PropTypes.node, // 上传按钮区内容
    triggerArea: PropTypes.func, // 触发区域（返回jsx），设置该属性，text属性会被覆盖
    uploadProps: PropTypes.object, // antd Upload 上传属性
    tips: PropTypes.object, // 信息提示器
    transformFrom: PropTypes.func, // 将上传接口返回的字段转换成组件内部使用的字段（转成这样 { id(必选), name(必选), url(可选) }）
    transformTo: PropTypes.func, // 将组件内部使用的字段转换成提交接口需要的字段（从这样转 { id(必选), name(必选), url(可选) }）
  }

  static defaultProps = {
    maxSize: 10, // 10M
    maxNumber: 5, // 5个
    readOnly: false, // 可编辑状态
    text: "文件上传",
    triggerArea: null,
    uploadProps: {
      action: "/yapi/upload",
      headers: {
        Authorization: "5cc8019d300000980a055e76",
      },
      beforeUpload: (file) => true,
    },
    tips: message, // 默认为antd 的 message（自定义时 至少需要提供 tips.success, tips.error）
    transformFrom: (file) => ({ id: file.fileId, name: file.fileName }),
    transformTo: (file) => ({ fileId: file.id, fileName: file.name }),
  }

  constructor(props) {
    super(props);

    this.state = {
      fileList: this.transformFrom(props.value) || [],
      loading: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ fileList: this.transformFrom(nextProps.value) });
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
    onChange && onChange(this.transformTo(fileList));
  }

  /**
   * 将上传接口返回的字段转换成组件内部使用的字段
   */
  transformFrom = (fileList = []) => {
    const { transformFrom } = this.props;
    return fileList.map(file => transformFrom(file));
  }

  /**
   * 将组件内部使用的字段转换成提交接口需要的字段
   */
  transformTo = (fileList = []) => {
    const { transformTo } = this.props;
    return fileList.map(file => transformTo(file));
  }

  render() {
    const {
      className,
      maxNumber,
      readOnly,
      text,
      triggerArea,
      uploadProps,
      tips,
      transformFrom,
      onChange,
    } = this.props;

    const { fileList, loading } = this.state;

    const props = {
      ...uploadProps,
      name: "file",
      showUploadList: false,
      beforeUpload: (file) => {
        return this.checkFile(file) && 
          uploadProps.beforeUpload && uploadProps.beforeUpload(file);
      },
      onChange: (info) => {
        if (info.file.status === "uploading") {
          this.setState({ loading: true });
        } else {
          console.log(info.file);
          let { fileList } = this.state;
          fileList.push(transformFrom(info.file.response.data));
          this.setState({ loading: false, fileList });
          onChange && onChange(this.transformTo(fileList));
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
            triggerArea
              ? triggerArea(loading)
              : <Button disabled={loading}>
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
                {!readOnly && (
                  <Icon type="close" onClick={() => this.onRemove(file)} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}