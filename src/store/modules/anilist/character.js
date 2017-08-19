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
    state.searchResult = []
  }
}

let actions = {
  searchCharacter: async ({ dispatch, commit, state }, query) => {
    if (!state.token || (state.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('refreshToken')
    return new Promise((resolve, reject) => {
      axios(SETTING.api + 'character' + '/search/' + query + '?' + 'access_token=' + state.token)
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