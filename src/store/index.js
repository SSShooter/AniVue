/**
 * @file store index
 * @author ssshooter(472356884@qq.com)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import appShell from './modules/app-shell'
import anilistApi from './modules/anilist-api'
import SETTING from './api-setting'
Vue.use(Vuex)

function refreshToken() {
  let param = `grant_type=${SETTING.grant_type}&client_id=${SETTING.client_id}&client_secret=${SETTING.client_secret}`
  return axios.post(SETTING.api + SETTING.getToken + '?' + param)
}

axios.interceptors.request.use(async (config) => {
  if (config.method === 'get') {
    if (!localStorage.token || (localStorage.expires - 100) < Math.round(new Date().getTime() / 1000)) {
      let res = await refreshToken()
      localStorage.token = res.data.access_token
      localStorage.expires = res.data.expires
    }
    config.params = {}
    config.params.access_token = localStorage.token
  }
  return config;
}, (error) => {
  return Promise.reject(error)
});

export default new Vuex.Store({
  modules: {
    appShell,
    anilistApi
  }
})
