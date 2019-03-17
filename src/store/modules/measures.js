import MeasuresApi from '@/api/Measures'

export default {
  namespaced: true,
  strict: true,

  state: {
    measureIds: []
  },
  mutations: {
    SET_MEASURE_ID (state, payload) {
      state.measureIds = payload
      state.measureConditions = payload
    }
  },
  actions: {
    listMeasureId ({ commit }) {
      MeasuresApi.measureIds()
        .then(res => {
          commit('SET_MEASURE_ID', res.message)
        })
        .catch((error) => {
          console.log('Error fetching data. Error log: ' + JSON.stringify(error))
        })
    }
  },
  getters: {
    measureIds (state) {
      return state.measureIds
    }
  }
}
