import axios from 'axios'
import SETTING from '../../api-setting'

let actions = {
  search: (context, { series_type, query }) => {
    return axios(SETTING.api + series_type + '/search/' + query)
  },
  page: (context, { series_type, id }) => {
    return axios(SETTING.api + series_type + '/' + id + '/page')
  },
}
export default {
  namespaced: true,
  actions
}