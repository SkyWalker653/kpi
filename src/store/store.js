import Vue from 'vue'
import Vuex from 'vuex'
import payload from './modules/payload'
import rulesEngine from './modules/rulesEngine'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    payload,
    rulesEngine
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
