import Vue from 'vue'
import Vuex from 'vuex'
import payload from './modules/payload'
import rulesEngine from './modules/rulesEngine'
import alertEngine from './modules/alertEngine'
import measures from './modules/measures'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    payload,
    rulesEngine,
    alertEngine,
    measures
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
