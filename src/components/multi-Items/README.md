# 组件 - MultiItems

## 功能描述

> 表单组件 - 为自定义的选择组件提供输入框展示模式

## 参数说明

```javascript
static propTypes = {
  codeKey: PropTypes.string, // code-key 映射值（默认为code）
  labelKey: PropTypes.string, // label-key 映射值（默认为name，用于展示）
  closable: PropTypes.bool, // 每一项是否带有关闭按钮
  readOnly: PropTypes.bool, // 只读模式，设置了该属性，closable 属性无效
  placeholder: PropTypes.string,
  onTrigger: PropTypes.func, // 点击输入框触发的事件
  onItemClick: PropTypes.func, // 点击每一项触发的事件
}

static defaultProps = {
  codeKey: "code",
  labelKey: "name",
  closable: true,
  readOnly: false,
  placeholder: "",
}
```

## 组件使用

```javascript
import { MultiItems } from "anice-ui";

<Section title="测试1">
  {getFieldDecorator("test1")(
    <MultiItems closable={false} />
  )}
</Section>

<Section title="测试2">
  {getFieldDecorator("test2")(
    <MultiItems />
  )}
</Section>

<Section title="测试3">
  {getFieldDecorator("test3")(
    <MultiItems
      placeholder="测试3"
      onTrigger={() => {
        this.connectRef.open();
      }}
    />
  )}
  <ConnectedModal
    setRef={connectRef => this.connectRef = connectRef}
    onChange={(value) => {
      value = value.map(item => {
        return {
          code: item.bid,
          name: item.name,
        }
      });
      setFieldsValue({
        test3: value,
      });
    }}
  />
</Section>

<Section title="测试4">
  {getFieldDecorator("test4")(
    <UserSelect />
  )}
</Section>

<Section title="测试5">
  {getFieldDecorator("test5")(
    <MultiItems readOnly />
  )}
</Section>

// UserSelct 实现：

render() {
  const { value, onChange } = this.props;

  return (
    <div className="nice-user-select-wrapper">
      <MultiItems
        value={value}
        onChange={onChange}
        placeholder="请选择用户"
        onTrigger={() => {
          this.connectRef.open();
        }}
        style={{width: 300}}
      />
      <ConnectedModal
        setRef={connectRef => this.connectRef = connectRef}
        onChange={(value) => {
          value = value.map(item => {
            return {
              code: item.bid,
              name: item.name,
            }
          });
          onChange && onChange(value);
        }}
      />
    </div>
  )
}
```
