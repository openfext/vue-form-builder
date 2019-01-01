# element-form-builder

[![Version](https://img.shields.io/npm/v/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)
[![License](https://img.shields.io/npm/l/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)
[![Dependencies](https://img.shields.io/david/codetrial/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)

使用 JSON 配置构建 element-ui 动态表单.

:cn: 简体中文 | [:us: English](README.md)

## 在线示例

[:zap: 在线示例](https://element-form-builder.now.sh) | [:book: 参考文档](https://codetrial.github.io/element-form-builder)

![Screen Capture](.github/preview.gif)

## 快速开始

首先你需要有一个 element-ui 项目。如果没有，推荐使用下面的 preset 快速创建一个。

```bash
vue create --preset codetrial/vue-cli-plugin-element your-project
```

### 安装

```bash
yarn add element-form-builder
# OR
npm i element-form-builder
```

### 注册组件

```javascript
import FormBuilder from 'element-form-builder'

Vue.use(FormBuilder)
```

### 见证奇迹的时刻

Vue 模板:

```html
<el-form-builder :config="formConfig" v-model="formValues" label-width="80px">
</el-form-builder>
```

Vue 组件:

```javascript
export default {
  name: 'some-component',
  data() {
    return {
      formValues: {
        title: 'Some Awesome Title'
      },

      formConfig: {
        rules: {
          title: [{ required: true, message: '请输入标题' }]
        },
        elements: [
          {
            tag: 'el-input',
            item: {
              label: '标题'
            },
            detail: {
              name: 'title'
            }
          }
        ]
      }
    }
  }
}
```

## 核心功能

- :camera: 支持任意组件
- :tv: 表单校验
- :watch: 表单数据模型
- :radio: 自定义插槽

## 贡献

期待你的 `pull requests`。如果你觉得有帮助，还请多多反馈！

## 技术栈

- [Vue.js](https://github.com/vuejs/vue)
- [ElementUI](https://github.com/ElemeFE/element)

## 许可

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Felix Yang
