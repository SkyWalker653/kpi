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
    create (context, { organisation, companyName, data }) {
      return PayloadApi.create(organisation, companyName, data)
        .then(res => {
          return res
        })
        .catch((error) => {
          console.log('Create role Error: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    update (context, { payloadId, organisation, companyName, data }) {
      return PayloadApi.update(payloadId, organisation, companyName, data)
        .then(res => {
          return res
        })
        .catch((error) => {
          console.log('Create role Error: ' + JSON.stringify(error))
        })
        .finally(() => {})
    },
    delete (context, { payloadId }) {
      return PayloadApi.delete(payloadId)
        .then(res => {
          return res
        })
    },
    validationPayload (context, { organisation, company, data }) {
      // console.log('Org: ' + organisation)
      // console.log('Comp: ' + company)
      // console.log('Data: ' + JSON.stringify(data))
      return PayloadApi.validationPayload(organisation, company, data)
        .then(res => {
          return res
        })
    },
    testPayloadNotification (context, { refId }) {
      return PayloadApi.testPayloadNotification(refId)
        .then(res => {
          return res.data.result
        })
        .catch((error) => {
          console.log(error)
          return [{ 'error': 'Record not found!' }]
        })
        .finally(() => {})
    },
    markNotificationAsRead (context, { refId }) {
      return PayloadApi.markNotificationAsRead(refId)
        .then(res => {
          console.log(res)
          return res.result
        })
        .catch((error) => {
          console.log('Try notification Error: ' + JSON.stringify(error))
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
