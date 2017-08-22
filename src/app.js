/**
 * @file entry
 * @author ssshooter(472356884@qq.com)
 */

import Vue from 'vue'
import Vuetify from 'vuetify'
import {createRouter} from './router'
import store from './store'
import App from './App.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)
Vue.use(Vuetify)
Vue.use(VueLazyload)
Vue.component('icon', Icon)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
export function createApp () {
  let router = createRouter()
  let app = new Vue({
    router,
    store,
    ...App
  })
  return {app, router, store}
}
