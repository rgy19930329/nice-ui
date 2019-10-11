# 组件 - MultiItems

## 功能描述

> 表单组件 - 为自定义的选择组件提供输入框展示模式

## 参数说明

```javascript
static propTypes = {
  codeKey: PropTypes.string,
  labelKey: PropTypes.string,
  closable: PropTypes.bool,
}

static defaultProps = {
  codeKey: "code",
  labelKey: "name",
  closable: true,
}
```

## 组件使用

```javascript
import { MultiItems } from "nice-ui";

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
    <div className="comp-user-select-wrapper">
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