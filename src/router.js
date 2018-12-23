import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import PayloadEngine from './views/PayloadEngine.vue'
import AlertEngine from './views/AlertEngine'
import RuleEngine from './views/RuleEngine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/payload-engine',
          name: 'payload-engine',
          component: PayloadEngine
        },
        {
          path: '/alert-engine',
          name: 'alert-engine',
          component: AlertEngine
        },
        {
          path: '/rule-engine',
          name: 'rule-engine',
          component: RuleEngine
        }
      ]
    }
  ]
})
