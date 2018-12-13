import FormBuilder from './formbuilder'

const install = function installFormBuilder (Vue) {
  Vue.component('el-form-builder', FormBuilder)
}

export default {
  install
}
