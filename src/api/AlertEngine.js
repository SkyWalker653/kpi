import axios from 'axios'

export default {
  listAll () {
    // return axios.get('/alert')
    return axios.get('/payload/getall')
      .then(response => {
        // return response.data
        // TEMP RESPONSE
        let data = {
          'result': [
            {
              'phone_no': '9003315807',
              'qualified': 'denominator',
              'mail': true,
              'mail_id': 'kasyap.aditya223@gmail.com',
              'alert_last_updated': '2019-02-13',
              'subject': 'Appolo Hospital',
              'sms': true,
              'id': 3,
              'body': 'gender,city',
              'measure_id': 2304,
              'status': 'active'
            },
            {
              'phone_no': '9003315807,8895181960',
              'qualified': 'numerator',
              'mail': false,
              'mail_id': 'kasyap.aditya223@gmail.com',
              'alert_last_updated': '2019-02-13',
              'subject': 'Kalinga Hospital',
              'sms': false,
              'id': 4,
              'body': 'address.pincode',
              'measure_id': 2305,
              'status': 'active'
            },
            {
              'phone_no': '',
              'qualified': 'denominator',
              'not_qualified': 'numerator',
              'mail': true,
              'mail_id': 'kasyap.aditya223@gmail.com',
              'alert_last_updated': '2019-02-18',
              'subject': 'Appolo Hospital',
              'sms': true,
              'id': 5,
              'body': 'gender,city',
              'measure_id': 2307,
              'status': 'active'
            },
            {
              'phone_no': '9003315807,8895181960',
              'not_qualified': 'denominator',
              'mail': true,
              'mail_id': 'sibabrataacharya2@gmail.com',
              'alert_last_updated': '2019-02-18',
              'subject': 'Kalinga Hospital',
              'sms': false,
              'id': 6,
              'body': 'address.pincode',
              'measure_id': 2306,
              'status': 'active'
            },
            {
              'phone_no': '9003315807',
              'qualified': 'denominator',
              'not_qualified': 'numerator',
              'mail': true,
              'mail_id': 'sibabrataacharya2@@gmail.com',
              'alert_last_updated': '2019-02-18',
              'subject': 'MIPS Hospital',
              'sms': true,
              'id': 7,
              'body': 'gender,city',
              'measure_id': 2308,
              'status': 'active'
            },
            {
              'phone_no': '9003315807',
              'qualified': 'denominator',
              'not_qualified': 'numerator',
              'mail': true,
              'mail_id': 'sibabrataacharya2@gmail.com',
              'alert_last_updated': '2019-02-18',
              'subject': 'MIPS Hospital',
              'sms': true,
              'id': 8,
              'body': 'gender,city',
              'measure_id': 2309,
              'status': 'active'
            }
          ],
          'Reference Id': '0de02b8731233502'
        }
        return data.result
      })
  },
  conditions () {
    // return axios.get('/alert')
    return axios.get('/payload/getall')
      .then(response => {
        // return response.data
        // TEMP RESPONSE
        let data = {
          '6767': {
            'denominator': true,
            'numerator': true,
            'denominatorExclusion': false,
            'denominatorException': false
          },
          '6768': {
            'denominator': true,
            'numerator': true,
            'denominatorExclusion': false,
            'denominatorException': false
          }
        }
        return data
      })
  }
}
