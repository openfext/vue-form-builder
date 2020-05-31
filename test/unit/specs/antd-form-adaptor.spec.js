import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useForm, useFormElement } from '@fext/vue-use';
import Antd from 'ant-design-vue';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import { createFormBuilder } from 'src';
import { AntFormAdaptor } from 'src/ant-form-adaptor';

const TestComponent = {
  template: `<a-form>
    <form-builder
      :form="form"
      :shares="formShares"
      :config="formConfig"
      :metadata="metadata"
    ></form-builder>
  </a-form>`,

  components: {
    FormBuilder: createFormBuilder({
      components: {
        AntFormAdaptor
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
              component: 'AntFormAdaptor',
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
              component: 'AntFormAdaptor',
              label: 'type-label',
              tip: 'type-tip',
              items: [
                { text: 'Type-1', value: '1' },
                { text: 'Type-2', value: '2' },
                { text: 'Type-3', value: '3' }
              ],
              extend: {
                component: 'a-checkbox-group'
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
  Vue.use(Antd);

  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);
});

describe('ant design vue form adaptor', () => {
  test('render adaptors', () => {
    const adaptorWrappers = wrapper.findAllComponents(AntFormAdaptor);

    expect(adaptorWrappers.length).toBe(2);

    expect(wrapper.findAll('.ant-input').length).toBe(1);
    expect(wrapper.findAll('.ant-checkbox').length).toBe(3);
  });

  test('update value', async () => {
    const inputWrapper = wrapper.findAllComponents(AntFormAdaptor).at(0);

    inputWrapper.vm.updateAntLocalValue({
      target: {
        value: 'ant'
      }
    });

    await Vue.nextTick();

    expect(vm.formValues.comment).toBe('ant');

    inputWrapper.vm.updateAntLocalValue('foo');

    await Vue.nextTick();

    expect(vm.formValues.comment).toBe('foo');

    vm.formValues.comment = 'bar';

    await Vue.nextTick();

    expect(inputWrapper.vm.localValue).toBe('bar');
  });
});
