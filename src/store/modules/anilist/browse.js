import axios from 'axios'
import SETTING from '../../api-setting'

const querystring = require('querystring')

let actions = {
  search: async ({ dispatch, commit, rootState }, query) => {
    if (!rootState.anilistApi.token || (rootState.anilistApi.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('anilistApi/refreshToken', null, { root: true })
    query.access_token = rootState.anilistApi.token
    let withoutNull = {}
    for (let key in query) {
      if (query[key])
        withoutNull[key] = query[key]
    }
    console.log(querystring.stringify(query))
    return axios(SETTING.api + 'browse/anime' + '?' + querystring.stringify(withoutNull))
  }
}
export default {
  namespaced: true,
  actions
}