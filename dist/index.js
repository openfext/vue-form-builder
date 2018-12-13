/**
 * Element form-builder v0.1.0
 * (c) 2018 Felix Yang
 */
var FormBuilder = {
  name: 'ElFormBuilder',

  props: {},

  render: function render(h) {
    return h('div', {}, ['formbuilder']);
  }
};

var install = function installFormBuilder(Vue) {
  Vue.component('el-form-builder', FormBuilder);
};

var index = {
  install: install
};

export default index;
