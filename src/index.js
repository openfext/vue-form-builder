import FormBuilder from './components/FormBuilder.vue';

const install = function(Vue) {
  Vue.component('form-builder', FormBuilder);
};

const createFormBuilder = function(options = {}) {
  return {
    ...FormBuilder,
    ...options
  };
};

export { FormBuilder, createFormBuilder };

export default {
  install
};
