/**
 * @file store index
 * @author ssshooter(472356884@qq.com)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import appShell from './modules/app-shell'
import anilistApi from './modules/anilist-api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appShell,
    anilistApi
  }
})
