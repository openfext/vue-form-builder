import Vue from 'vue'
import ElementUI from 'element-ui'
import FormBuilder from 'builder'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(FormBuilder)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
