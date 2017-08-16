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
    console.log('empty')
    state.searchResult = []
  }
}

let actions = {
  search: async ({ dispatch, commit ,rootState }, { series_type, query }) => {
    console.log(rootState)
    if (!rootState.anilistApi.token || (rootState.anilistApi.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('anilistApi/refreshToken', null, { root: true })
    return new Promise((resolve, reject) => {
      axios(SETTING.api + series_type + '/search/' + query + '?' + 'access_token=' + rootState.anilistApi.token)
        .then(res => {
          commit('refreshSearchResult', res.data)
          resolve()
        })
    })
  }
}
export default {
  namespaced:true,
  state,
  gettters,
  mutations,
  actions
}