import axios from 'axios'
import SETTING from '../api-setting'
import series from './anilist/series'
import character from './anilist/character'

let state = {
  token: '',
  expires: 0
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
  }
}

export default {
  namespaced: true,
  state,
  gettters,
  mutations,
  actions,
  modules: {
    series,
    character
  }
}