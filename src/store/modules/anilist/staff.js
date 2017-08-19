import axios from 'axios'
import SETTING from '../../api-setting'

let state = {
  searchResult: []
}

let gettters = {
  getSearchResult: state => {
    return state.searchResult
  }
}

let mutations = {
  refreshSearchResult: (state, newResult) => {
    state.searchResult = newResult
  },
  emptySearchResult: (state) => {
    state.searchResult = null
  }
}

let actions = {
  search: async ({ dispatch, commit ,rootState }, query) => {
    if (!rootState.anilistApi.token || (rootState.anilistApi.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('anilistApi/refreshToken', null, { root: true })
    return axios(SETTING.api + 'staff/search/' + query + '?' + 'access_token=' + rootState.anilistApi.token)
  },
  page: async ({ dispatch, commit ,rootState }, id ) => {
    if (!rootState.anilistApi.token || (rootState.anilistApi.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('anilistApi/refreshToken', null, { root: true })
    return axios(SETTING.api + 'staff/'+ id +'/page?' + 'access_token=' + rootState.anilistApi.token)
  },
}
export default {
  namespaced:true,
  state,
  gettters,
  mutations,
  actions
}