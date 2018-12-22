import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import PayloadEnginee from './views/PayloadEnginee.vue'
import AlertEnginee from './views/AlertEnginee'
import RuleEnginee from './views/RuleEnginee'

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
          path: '/payload-enginee',
          name: 'payload-enginee',
          component: PayloadEnginee
        },
        {
          path: '/alert-enginee',
          name: 'alert-enginee',
          component: AlertEnginee
        },
        {
          path: '/rule-enginee',
          name: 'rule-enginee',
          component: RuleEnginee
        }
      ]
    }
  ]
})
