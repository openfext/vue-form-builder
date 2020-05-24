import FormBuilder, { createFormBuilder } from './components/FormBuilder.vue';

const install = function installFormBuilder(Vue) {
  Vue.component('form-builder', FormBuilder);
};

export { FormBuilder, createFormBuilder };

export default {
  install
};
