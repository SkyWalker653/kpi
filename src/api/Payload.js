import axios from 'axios'

export default {
  listAll () {
    return axios.get('/payload/getall')
      .then(response => {
        return response.data
      })
  },

  create (organisation, payloadName, data) {
    return axios.post(`payload/${organisation}/${payloadName}`, data)
      .then(response => {
        return response
      })
  }
}
