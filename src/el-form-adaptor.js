import ElFormAdaptor from './components/adaptors/ElementFormAdaptor.vue';

const install = function installElFormAdaptor(Vue) {
  Vue.component('el-form-adaptor', ElFormAdaptor);
};

export { ElFormAdaptor };

export default {
  install
};
