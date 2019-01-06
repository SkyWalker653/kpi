import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './styles/quasar.styl'
import 'quasar-framework/dist/quasar.ie.polyfills'
import 'quasar-extras/animate'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import axios from 'axios'
import Quasar from 'quasar'

Vue.use(Quasar, {
  config: {}
})

axios.defaults.baseURL = 'http://3.85.66.14:8080'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
