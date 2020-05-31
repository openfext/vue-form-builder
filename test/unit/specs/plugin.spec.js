import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { useForm, useFormElement } from '@fext/vue-use';
import FormBuilder from 'src';
import ElFormAdatpor from 'src/el-form-adaptor';
import ViewFormAdatpor from 'src/view-form-adaptor';
import AntFormAdatpor from 'src/ant-form-adaptor';

const TestComponent = {
  template: `<div>
    <form-builder
      :form="form"
      :config="[]"
    ></form-builder>
  </div>`,

  setup() {
    const form = useForm();

    return {
      form
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
  Vue.use(FormBuilder);
  Vue.use(ElFormAdatpor);
  Vue.use(ViewFormAdatpor);
  Vue.use(AntFormAdatpor);
});

describe('vue plugin', () => {
  test('use form builder', () => {
    const component = Vue.component('form-builder');

    expect(component).toBeDefined();
  });

  test('use element form adaptor', () => {
    const component = Vue.component('el-form-adaptor');

    expect(component).toBeDefined();
  });

  test('use view form adaptor', () => {
    const component = Vue.component('view-form-adaptor');

    expect(component).toBeDefined();
  });

  test('use ant design adaptor', () => {
    const component = Vue.component('ant-form-adaptor');

    expect(component).toBeDefined();
  });
});
