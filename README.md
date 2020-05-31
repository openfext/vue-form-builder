# Vue Form Builder

[![CircleCI](https://circleci.com/gh/openfext/vue-use.svg?style=svg)](https://circleci.com/gh/openfext/vue-use)
[![codecov](https://codecov.io/gh/openfext/vue-form-builder/branch/develop/graph/badge.svg)](https://codecov.io/gh/openfext/vue-form-builder)
[![License](https://img.shields.io/npm/l/@fext/vue-form-builder.svg)](https://www.npmjs.com/package/@fext/vue-form-builder)
[![Version](https://img.shields.io/npm/v/@fext/vue-form-builder.svg)](https://www.npmjs.com/package/@fext/vue-form-builder)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/openfext/vue-form-builder)

Build powerful vue form with JSON schema and composition api. Any custom input components and popular ui frameworks such as [Element UI](https://element.eleme.cn/) , [View UI](https://www.iviewui.com/), [Ant Design Vue](https://www.antdv.com/) are supported.

## Example

[:zap: Live Preview](https://openfext.github.io/vue-admin-next/#/form/form-builder) | [:book: Element UI Storybook](https://openfext.github.io/vue-form-builder/?path=/story/formbuilder-element-ui--basic-usage) | [:book: View UI Storybook](https://openfext.github.io/vue-form-builder/?path=/story/formbuilder-view-ui--basic-usage) | [:book: Ant Design Storybook](https://openfext.github.io/vue-form-builder/?path=/story/formbuilder-ant-design-vue--basic-usage)

![Screen Capture](https://github.com/openfext/vue-form-builder/raw/develop/.github/preview.gif)

## Core Features

- :tv: **Powerful** - use composition api to manage complex form state
- :camera: **Flexible** - support any custom input components
- :watch: **Adaptable** - different ui frameworks can be used out of the box through the adapters
- :radio: **Reliable** - has been used in multiple applications in the production environment

## Docs

[Complete API Reference](http://openfext.github.io/docs/vue-form-builder)

## Quick Start

Let ’s take Element UI as an example, first you need a vue application like [Vue Admin Next](https://github.com/openfext/vue-admin-next).

### Install

```bash
npm i @fext/vue-form-builder
```

### Registration

#### Global Registration

```javascript
import FormBuilder from '@fext/vue-form-builder';
import ElFormAdaptor from '@fext/vue-form-builder/lib/adaptor/element';

Vue.use(FormBuilder); // form-builder
Vue.use(ElFormAdaptor); // el-form-adaptor
```

#### Local Registration

Use the factory method based on the specified component:

```javascript
import { createFormBuilder } from '@fext/vue-form-builder';
import { ElFormAdaptor } from '@fext/vue-form-builder/lib/adaptor/element';
import AwesomeFormComponents from 'path/to/awesome/components';

export default {
  name: 'awesome-form'

  components: {
    FormBuilder: createFormBuilder({
      components: {
        ElFormAdaptor,

        ...AwesomeFormComponents
      }
    })
  },
}
```

### Build Form

Vue template:

```html
<el-form>
  <form-builder :form="form" :config="formConfig"></form-builder>
</el-form>
```

Vue component:

```javascript
import { useForm } from '@fext/vue-use';

export default {
  components: {
    FormBuilder: createFormBuilder({
      components: {
        ElFormAdaptor
      }
    })
  },

  setup() {
    const form = useForm();

    return {
      form
    };
  },

  data() {
    return {
      formConfig: [
        {
          component: 'div',
          fields: [
            {
              name: 'comment',
              component: 'ElFormAdaptor',
              label: 'Normal Input',
              rules: {
                required: true
              },
              props: {
                placeholder: 'Render with el-input component'
              }
            }
          ]
        }
      ]
    };
  }
};
```

## Built With

- [Vue.js](https://github.com/vuejs/vue)
- [Vue Use](https://github.com/openfext/vue-use)
- [ElementUI](https://github.com/ElemeFE/element)
- [View UI](https://github.com/view-design/ViewUI)
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Felix Yang
