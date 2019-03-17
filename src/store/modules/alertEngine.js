import AlertApi from '@/api/AlertEngine'

export default {
  namespaced: true,
  strict: true,

  state: {
    alerts: [],
    conditions: []
  },

  mutations: {
    SET (state, payload) {
      state.alerts = payload
    },
    SET_CONDITIONS (state, payload) {
      state.conditions = payload
    }
  },

  actions: {
    list ({ commit }) {
      return AlertApi.listAll()
        .then(res => {
          commit('SET', res)
          return res
        })
    },
    conditions ({ commit }) {
      return AlertApi.conditions()
        .then(res => {
          commit('SET_CONDITIONS', res)
          return res
        })
    }
  },
  getters: {
    alerts (state) {
      return state.alerts
    },
    conditions (state) {
      return state.conditions
    }
  }
}
