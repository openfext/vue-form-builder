import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useForm, useFormElement } from '@fext/vue-use';
import { createFormBuilder } from 'src';
import { ElFormAdaptor } from 'src/el-form-adaptor';

const ExampleName = {
  template: `
    <div>
      <input type="text" :value="localValue" @input="updateLocalValue" />
      <button type="button" @click="doSomething">BTN</button>
    </div>
  `,

  props: {
    name: String,
    tip: String,
    tooltip: String,
    label: String,
    hide: Boolean,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    defaultValue: {
      required: false
    },
    items: Array,
    extend: Object,
    metadata: Object,
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const { localValue, updateLocalValue } = useFormElement(props, context);

    return {
      localValue,
      updateLocalValue
    };
  },

  methods: {
    doSomething(evt) {
      this.$emit('command', 'doSomething', { id: 123456 });
    }
  }
};

const TestComponent = {
  template: `<div>
    <form-builder
      @command="handleCommand"
      :form="form"
      :shares="formShares"
      :config="formConfig"
      :metadata="metadata"
    ></form-builder>
  </div>`,

  components: {
    FormBuilder: createFormBuilder({
      components: {
        ExampleName,
        ElFormAdaptor
      }
    })
  },

  setup() {
    const form = useForm();
    const { formValues, updateFormValues } = form;

    return {
      form,
      formValues,
      updateFormValues
    };
  },

  data() {
    return {
      showResultModal: false,

      metadata: {},

      formShares: {
        size: 'medium'
      },

      formConfig: [
        {
          component: 'div',
          fields: [
            {
              name: 'name',
              component: 'ExampleName',
              label: 'Name',
              defaultValue: 'example',
              rules: {
                required: true
              }
            }
          ]
        }
      ]
    };
  },

  methods: {
    handleCommand(cmd, ...args) {
      mockCommand(cmd, ...args);
    }
  }
};

let mockCommand = null;
let wrapper = null;
let vm = null;
beforeEach(() => {
  wrapper = mount(TestComponent);
  vm = wrapper.vm;
  mockCommand = jest.fn();
});

afterEach(() => {
  wrapper.destroy();
});

beforeAll(() => {
  Vue.use(VueCompositionAPI);
});

describe('form builder', () => {
  test('receive props', () => {
    const nameWrapper = wrapper.findComponent(ExampleName);
    const nameVM = nameWrapper.vm;

    expect(nameVM.name).toBe('name');
  });

  test('default value', () => {
    const nameWrapper = wrapper.findComponent(ExampleName);
    const nameVM = nameWrapper.vm;

    expect(nameVM.value).toBe('example');
  });

  test('handle command', () => {
    const nameWrapper = wrapper.findComponent(ExampleName);
    const nameVM = nameWrapper.vm;
    const button = nameWrapper.find('button');

    button.trigger('click');
    button.trigger('click');

    expect(mockCommand.mock.calls.length).toBe(2);
  });
});
