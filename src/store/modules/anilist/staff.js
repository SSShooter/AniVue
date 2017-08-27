import axios from 'axios'
import SETTING from '../../api-setting'

let actions = {
  search: (context, query) => {
    return axios(SETTING.api + 'staff/search/' + query)
  },
  page: (context, id ) => {
    return axios(SETTING.api + 'staff/'+ id +'/page')
  },
}
export default {
  namespaced:true,
  actions
}