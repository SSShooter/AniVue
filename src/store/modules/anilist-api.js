import axios from 'axios'
import SETTING from '../api-setting'
import series from './anilist/series'
import staff from './anilist/staff'
import browse from './anilist/browse'

export default {
  namespaced: true,
  modules: {
    series,
    staff,
    browse
  }
}
