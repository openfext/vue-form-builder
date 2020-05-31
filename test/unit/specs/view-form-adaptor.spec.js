import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useForm, useFormElement } from '@fext/vue-use';
import ViewUI from 'view-design';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import { createFormBuilder } from 'src';
import { ViewFormAdaptor } from 'src/view-form-adaptor';

const TestComponent = {
  template: `<Form>
    <form-builder
      :form="form"
      :shares="formShares"
      :config="formConfig"
      :metadata="metadata"
    ></form-builder>
  </Form>`,

  components: {
    FormBuilder: createFormBuilder({
      components: {
        ViewFormAdaptor
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
              name: 'comment',
              component: 'ViewFormAdaptor',
              label: 'comment-label',
              tip: 'comment-tip',
              rules: {
                required: true,
                max: 50,
                min: 10
              },
              props: {
                placeholder: 'comment-placeholder'
              }
            },
            {
              name: 'type',
              component: 'ViewFormAdaptor',
              label: 'type-label',
              tip: 'type-tip',
              items: [
                { text: 'Type-1', value: '1' },
                { text: 'Type-2', value: '2' },
                { text: 'Type-3', value: '3' }
              ],
              extend: {
                component: 'CheckboxGroup'
              },
              props: {
                min: 1
              }
            }
          ]
        }
      ]
    };
  }
};

let wrapper = null;
let vm = null;
beforeEach(() => {
  wrapper = mount(TestComponent);
  vm = wrapper.vm;
});

afterEach(() => {
  wrapper.destroy();
});

beforeAll(() => {
  Vue.use(VueCompositionAPI);
  Vue.use(ViewUI);

  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);
});

describe('view ui form adaptor', () => {
  test('render adaptors', () => {
    const adaptorWrappers = wrapper.findAllComponents(ViewFormAdaptor);

    expect(adaptorWrappers.length).toBe(2);

    expect(wrapper.findAll('.ivu-input').length).toBe(1);
    expect(wrapper.findAll('.ivu-checkbox').length).toBe(3);
  });

  test('update value', async () => {
    const inputWrapper = wrapper.findAllComponents(ViewFormAdaptor).at(0);

    inputWrapper.vm.updateLocalValue('foo');

    await Vue.nextTick();

    expect(vm.formValues.comment).toBe('foo');

    vm.formValues.comment = 'bar';

    await Vue.nextTick();

    expect(inputWrapper.vm.localValue).toBe('bar');
  });
});
