import axios from 'axios'
import SETTING from '../api-setting'

let state = {
  token: '',
  expires: 0,
  searchResult: {}
}

let gettters = {
  getToken: state => {
    return state.token
  }
}

let mutations = {
  refreshToken: (state, { access_token, expires }) => {
    state.token = access_token
    state.expires = expires
  },
  refreshSearchResult: (state, newResult) => {
    state.searchResult = newResult
    console.log(state.searchResult)
  }
}

let actions = {
  refreshToken: async (context) => {
    console.log('refresh')
    let param = `grant_type=${SETTING.grant_type}&client_id=${SETTING.client_id}&client_secret=${SETTING.client_secret}`
    return new Promise((resolve, reject) => {
      axios.post(SETTING.api + SETTING.getToken + '?' + param)
        .then(res => {
          context.commit('refreshToken', res.data)
          resolve()
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  searchSeries: async ({ dispatch, commit, state }, { series_type, query }) => {
    if (!state.token || (state.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('refreshToken')
    axios(SETTING.api + series_type + '/search/' + query + '?' + 'access_token=' + state.token)
      .then(res => {
        commit('refreshSearchResult', res.data)
      })
  },
  searchCharacter: async ({ dispatch, commit, state }, query) => {
    if (!state.token || (state.expires - 100) < Math.round(new Date().getTime() / 1000))
      await dispatch('refreshToken')
    axios(SETTING.api + 'character' + '/search/' + query + '?' + 'access_token=' + state.token)
      .then(res => {
        commit('refreshSearchResult', res.data)
      })
  }
}

export default {
  namespaced: true,
  state,
  gettters,
  mutations,
  actions
}