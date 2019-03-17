import axios from 'axios'

export default {
  measureIds () {
    return axios.get('/measure/description')
      .then(response => {
        return response.data
      })
  }
}
