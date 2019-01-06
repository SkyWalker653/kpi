import store from 'vuex-store'
import PayloadApi from '@/api/Payload'

export default {
  namespaced: true,
  strict: true,

  state: {
    payloades: []
  },
  mutations: {
    SET (state, payload) {
      state.payloades = payload
    },
    RESET (state) {
      state.payloades = []
    }
  },
  actions: {
    list ({ commit }) {
      return PayloadApi.listAll()
        .then(res => {
          commit('SET', res.result)
          return res
        })
        .catch((error) => {
          console.log('Error fetching payloades ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    create (context, { organisation, payloadName, data }) {
      return PayloadApi.create(organisation, payloadName, data)
        .then(res => {
          return res
        })
        .catch((error) => {
          console.log('Create role Error: ' + JSON.stringify(error))
        })
        .finally(() => {})
    }
  },
  getters: {
    payloades (state) {
      return state.payloades
    }
  }
}
