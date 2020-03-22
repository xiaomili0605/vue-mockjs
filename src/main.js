import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入mock的index 这样全局都可以使用
import './mock/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
