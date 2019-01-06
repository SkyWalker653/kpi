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
  }
}
