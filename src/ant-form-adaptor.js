import AntFormAdaptor from './components/adaptors/AntFormAdaptor.vue';

const install = function installAntFormAdaptor(Vue) {
  Vue.component('ant-form-adaptor', AntFormAdaptor);
};

export { AntFormAdaptor };

export default {
  install
};
