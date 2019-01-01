# element-form-builder

[![Version](https://img.shields.io/npm/v/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)
[![License](https://img.shields.io/npm/l/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)
[![Dependencies](https://img.shields.io/david/codetrial/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)

Build element-ui forms with JSON schema.

:us: English | [:cn: 简体中文](README.zh-CN.md)

## Example

[:zap: Live Preview](https://element-form-builder.now.sh) | [:book: Docs](https://codetrial.github.io/element-form-builder)

![Screen Capture](.github/preview.gif)

## Quick Start

First you need to have an element-ui project. If not, it is recommended to create one quickly using the preset below.

```bash
vue create --preset codetrial/vue-cli-plugin-element your-project
```

### Install

```bash
yarn add element-form-builder
```

### Registry

```javascript
import FormBuilder from 'element-form-builder'

Vue.use(FormBuilder)
```

### Witness the miracle moment

Vue template:

```html
<el-form-builder :config="formConfig" v-model="formValues" label-width="80px">
</el-form-builder>
```

Vue component:

```javascript
export default {
  data() {
    return {
      formValues: {
        title: 'Some Awesome Title'
      },

      formConfig: {
        rules: {
          title: [{ required: true, message: 'Please enter the title' }]
        },
        elements: [
          {
            tag: 'el-input',
            item: {
              label: 'Title'
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

## Core Features

- :camera: Any Component
- :tv: Form Validation
- :watch: Form Model
- :radio: Custom Slot

## Contributing

Looking forward to your pull requests.

## Built With

- [Vue.js](https://github.com/vuejs/vue)
- [ElementUI](https://github.com/ElemeFE/element)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Felix Yang
