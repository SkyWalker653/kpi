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
  },

  listRules (organisation, company) {
    // return axios.get(`/measure/${organisation}/${company}`)
    return axios.get('/payload/getall')
      .then(response => {
        let data = {
          'Reference Id': 'd17a04a69815c639',
          'message': [
            {
              'rules': {
                'measureDenominatorExclusion': [
                  {
                    'measure_value': '',
                    'measure_type': '',
                    'measure_suffix': '',
                    'id': 7,
                    'measure_field': '',
                    'measure_id': 2002,
                    'measure_condition': ''
                  }
                ],
                'measureNumerators': [
                  {
                    'measure_value': 'odisha',
                    'measure_type': 'String',
                    'measure_suffix': 'NO SUFFIX',
                    'id': 22,
                    'measure_field': 'address.state',
                    'measure_id': 2002,
                    'measure_condition': 'Equal to'
                  }
                ],
                'measureDenomnators': [
                  {
                    'measure_value': 'male',
                    'measure_type': 'String',
                    'measure_suffix': 'NO SUFFIX',
                    'id': 22,
                    'measure_field': 'gender',
                    'measure_id': 2002,
                    'measure_condition': 'Contains this'
                  }
                ],
                'measureNumeratorExclusion': [],
                'measureDenominatorException': [
                  {
                    'measure_value': '',
                    'measure_type': '',
                    'measure_suffix': '',
                    'id': 7,
                    'measure_field': '',
                    'measure_id': 2002,
                    'measure_condition': ''
                  }
                ]
              },
              'master': {
                'measure_payload_name': 'cap-nike',
                'measure_description': 'This is a test measure',
                'measure_status': 'InBuild',
                'measure_id': 2002,
                'payload_last_updated': '2019-01-14'
              }
            },
            {
              'rules': {
                'measureDenominatorExclusion': [
                  {
                    'measure_value': '',
                    'measure_type': '',
                    'measure_suffix': '',
                    'id': 8,
                    'measure_field': '',
                    'measure_id': 2003,
                    'measure_condition': ''
                  }
                ],
                'measureNumerators': [
                  {
                    'measure_value': 'odisha',
                    'measure_type': 'String',
                    'measure_suffix': 'NO SUFFIX',
                    'id': 23,
                    'measure_field': 'address.state',
                    'measure_id': 2003,
                    'measure_condition': 'Equal to'
                  }
                ],
                'measureDenomnators': [
                  {
                    'measure_value': 'male',
                    'measure_type': 'String',
                    'measure_suffix': 'NO SUFFIX',
                    'id': 23,
                    'measure_field': 'gender',
                    'measure_id': 2003,
                    'measure_condition': 'Equal to'
                  }
                ],
                'measureNumeratorExclusion': [],
                'measureDenominatorException': [
                  {
                    'measure_value': '',
                    'measure_type': '',
                    'measure_suffix': '',
                    'id': 8,
                    'measure_field': '',
                    'measure_id': 2003,
                    'measure_condition': ''
                  }
                ]
              },
              'master': {
                'measure_payload_name': 'cap-nike',
                'measure_description': 'another test measure',
                'measure_status': 'InBuild',
                'measure_id': 2003,
                'payload_last_updated': '2019-01-14'
              }
            },
            {
              'rules': {
                'measureDenominatorExclusion': [
                  {
                    'measure_value': '',
                    'measure_type': '',
                    'measure_suffix': '',
                    'id': 9,
                    'measure_field': '',
                    'measure_id': 2004,
                    'measure_condition': ''
                  }
                ],
                'measureNumerators': [
                  {
                    'measure_value': 'siba',
                    'measure_type': 'String',
                    'measure_suffix': 'NO SUFFIX',
                    'id': 24,
                    'measure_field': 'person',
                    'measure_id': 2004,
                    'measure_condition': 'Equal to'
                  }
                ],
                'measureDenomnators': [
                  {
                    'measure_value': 'male',
                    'measure_type': 'String',
                    'measure_suffix': 'NO SUFFIX',
                    'id': 24,
                    'measure_field': 'gender',
                    'measure_id': 2004,
                    'measure_condition': 'Equal to'
                  }
                ],
                'measureNumeratorExclusion': [],
                'measureDenominatorException': [
                  {
                    'measure_value': '',
                    'measure_type': '',
                    'measure_suffix': '',
                    'id': 9,
                    'measure_field': '',
                    'measure_id': 2004,
                    'measure_condition': ''
                  }
                ]
              },
              'master': {
                'measure_payload_name': 'cap-nike',
                'measure_description': 'Testing single values',
                'measure_status': 'InBuild',
                'measure_id': 2004,
                'payload_last_updated': '2019-01-14'
              }
            }
          ]
        }
        return data.message
      })
  }
}
