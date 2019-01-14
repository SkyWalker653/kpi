import axios from 'axios'

export default {
  measureDescription () {
    return axios.get('/measure/description')
      .then(response => {
        return response.data
      })
  },
  allDenominatorNumerator () {
    return axios.get('/measure/all')
      .then(response => {
        return response.data
      })
  },
  create (data) {
    return axios.post(`measure/save`, data)
      .then(response => {
        return response.data
      })
  },
  payloadNames () {
    return axios.get('payload/names')
      .then(response => {
        return response.data
      })
  },
  fieldValue (key) {
    return axios.get(`payload/fields/${key}`)
      .then(response => {
        return response.data
      })
  }
}
