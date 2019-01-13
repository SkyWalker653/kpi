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

  testPayload (organisation, company, data) {
    return axios.post(`measure/getMeasures/${organisation}/${company}`, data)
      .then(response => {
        return response.data
      })
  },

  testPayloadNotification (refId) {
    return axios.get(`notify/${refId}`)
      .then(response => {
        console.log(response)
        return response.data
      })
  },

  markNotificationAsRead (refId) {
    return axios.post('/notify/update', refId)
      .then(response => {
        return response.data
      })
  }
}
