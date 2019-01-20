import axios from 'axios'

export default {
  listAll () {
    return axios.get('/payload/getall')
      .then(response => {
        return response.data
      })
  },

  create (organisation, companyName, data) {
    return axios.post(`payload/${organisation}/${companyName}`, data)
      .then(response => {
        return response.data
      })
  },

  update (payloadId, organisation, companyName, data) {
    return axios.put(`payload/${payloadId}/${organisation}/${companyName}`, data)
      .then(response => {
        return response.data
      })
  },

  delete (payloadId) {
    return axios.delete(`payload/${payloadId}/`)
      .then(response => {
        return response.data
      })
  },

  validationPayload (organisation, company, data) {
    return axios.post(`payload/validate/${organisation}/${company}`, data)
      .then(response => {
        return response.data
      })
  },

  testPayloadNotification (refId) {
    return axios.get(`notify/${refId}`)
      .then(response => {
        return response
      })
  },

  markNotificationAsRead (refId) {
    return axios.post('/notify/update', refId)
      .then(response => {
        return response.data
      })
  }
}
