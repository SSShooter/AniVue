import axios from 'axios'
import SETTING from '../../api-setting'

const querystring = require('querystring')

let actions = {
  search: (context, query) => {
    return axios(SETTING.api + 'browse/anime' + '?' + querystring.stringify(query))
  }
}
export default {
  namespaced: true,
  actions
}