# element-form-builder

[![CircleCI](https://circleci.com/gh/openfext/vue-use.svg?style=svg)](https://circleci.com/gh/openfext/vue-use)
[![codecov](https://codecov.io/gh/codetrial/element-form-builder/branch/develop/graph/badge.svg)](https://codecov.io/gh/codetrial/element-form-builder)
[![License](https://img.shields.io/npm/l/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)
[![Version](https://img.shields.io/npm/v/element-form-builder.svg)](https://www.npmjs.com/package/element-form-builder)

Build powerful vue form with JSON schema and composition api. Any custom input components and popular ui frameworks such as Element UI are supported.

## Example

[:zap: Live Preview](https://openfext.github.io/vue-admin-next/#/form/form-builder) | [:book: Storybook](https://codetrial.github.io/element-form-builder)

![Screen Capture](https://github.com/codetrial/element-form-builder/raw/develop/.github/preview.gif)

## Core Features

- :tv: **Powerful** - use composition api to manage complex form state
- :camera: **Flexible** - support any custom input components
- :watch: **Adaptable** - different ui frameworks can be used out of the box through the adapters
- :radio: **Reliable** - has been used in multiple applications in the production environment

## Quick Start

First you need a vue application like [Vue Admin Next](https://github.com/openfext/vue-admin-next).

### Install

```bash
npm i element-form-builder
```

### Registration

#### Global Registration

```javascript
import FormBuilder from 'element-form-builder';
import ElFormAdaptor from 'element-form-builder/lib/adaptor/element';

Vue.use(FormBuilder); // form-builder
Vue.use(ElFormAdaptor); // el-form-adaptor
```

#### Local Registration

Use the factory method based on the specified component:

```javascript
import { createFormBuilder } from 'element-form-builder';
import { ElFormAdaptor } from 'element-form-builder/lib/adaptor/element';
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

## Docs

TODO

## Built With

- [Vue.js](https://github.com/vuejs/vue)
- [Vue Use](https://github.com/openfext/vue-use)
- [ElementUI](https://github.com/ElemeFE/element)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 - present, Felix Yang
