import store from 'vuex-store'
import RulesEngineApi from '@/api/RulesEngine'
import PayloadApi from '@/api/Payload'

export default {
  namespaced: true,
  strict: true,

  state: {
    measureIds: [],
    measureData: [],
    rules: []
  },
  mutations: {
    SET_ID (state, payload) {
      state.measureIds = payload
    },
    SET_DATA (state, payload) {
      state.measureData = payload
    }
  },
  actions: {
    listMeasureId ({ commit }) {
      return RulesEngineApi.measureDescription()
        .then(res => {
          // commit('SET_ID', res.message)
          return res
        })
        .catch((error) => {
          console.log('Error fetching data. Error log: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    listMeasureDesc ({ commit }) {
      return RulesEngineApi.allDenominatorNumerator()
        .then(res => {
          // commit('SET_DATA', res)
          return res
        })
        .catch((error) => {
          console.log('Error fetching data. Error log: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    create (context, data) {
      return RulesEngineApi.create(data)
        .then(res => {
          return res
        })
    },
    delete (context, { measureId }) {
      return RulesEngineApi.delete(measureId)
        .then(res => {
          return res
        })
        .catch((error) => {
          console.log('Create role Error: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    payloadNames ({ commit }) {
      return RulesEngineApi.payloadNames()
        .then(res => {
          return res
        })
        .catch((error) => {
          console.log('Error fetching data. Error log: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    fieldValue ({ commit }, key) {
      return RulesEngineApi.fieldValue(key)
        .then(res => {
          return res.result
        })
        .catch((error) => {
          console.log('Error fetching data. Error log: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    calculateMeasures ({ commit }, { organisation, company, data }) {
      return RulesEngineApi.calculateMeasures(organisation, company, data)
        .then(res => {
          return res
        })
        .catch((error) => {
          console.log('Error fetching data. Error log: ' + JSON.stringify(error))
        })
        .finally(() => {})
    }
  },
  getters: {
    /* rulesEngine (state) {
      // let result = state.payloades.filter(word => word.length > 6)
      // for (const el of state.measureIds) {
      //   console.log(el.measure_id + '<br>')
      // }
      state.measureIds.forEach((el) => {
        let data = {
          'rule_id': el.measure_id,
          'rule_desc': el.measure_description,
          'rule_data': state.measureDesc.filter(item => item.include(el.measure_id))
        }
        console.log(data)
      })

      return state.rules
    } */

    measureIds (state) {
      return state.measureIds
    },

    measureData (state) {
      return state.measureData
    }
  }
}
