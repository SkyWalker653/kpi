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
        return response
      })
  }
}
