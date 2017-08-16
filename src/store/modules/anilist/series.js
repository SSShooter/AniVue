let state = {
  searchResult: {}
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
  search: async ({ dispatch, commit, state }, { series_type, query }) => {
    if (!state.token || (state.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('refreshToken')
    return new Promise((resolve, reject) => {
      axios(SETTING.api + series_type + '/search/' + query + '?' + 'access_token=' + state.token)
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