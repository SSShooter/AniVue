<template>
  <div class="app-search-series">
    <header>
      <v-btn light icon class="search-btn" @click="searchNow">
        <v-icon class="search-icon">search</v-icon>
      </v-btn>
      <form @submit.prevent="searchNow">
        <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off">
      </form>
      <v-btn flat @click="series_type = !series_type">{{ series_type2word }}</v-btn>
      <v-btn light icon class="search-btn" @click="query = ''">
        <v-icon class="search-icon">close</v-icon>
      </v-btn>
    </header>
    <div v-if="loading" class="search-loading">
      <v-progress-circular indeterminate v-bind:size="70" class="primary--text"></v-progress-circular>
    </div>
    <div class="search-content">
      <v-snackbar v-model="noResult" :timeout="2000" absolute primary>
        没有搜索结果
      </v-snackbar>
      <v-layout v-if="searchResult && searchResult.length" class="series-wrapper" row wrap>
        <series-card v-for="item in searchResult" :item="item" :type="series_type"></series-card>
      </v-layout>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import SeriesCard from '@/components/SeriesCard'
import router from 'vue-router'
export default {
  name: 'searchSeries',
  components: { SeriesCard },
  data() {
    return {
      query: '',
      data: [],
      loading: false,
      noResult: false,
      // false for anime true for manga
      series_type: false,
      num2season: ['winter', 'spring', 'summer', 'fall']
    }
  },
  computed: {
    ...mapState('anilistApi/series', [
      'searchResult'
    ]),
    series_type2word() {
      return this.series_type ? 'manga' : 'anime'
    }
  },
  methods: {
    ...mapActions('appShell/appHeader', [
      'setAppHeader'
    ]),
    ...mapActions('appShell/appBottomNavigator', [
      'showBottomNav'
    ]),
    ...mapActions('anilistApi/series', [
      'search'
    ]),
    ...mapMutations('anilistApi/series', [
      'emptySearchResult'
    ]),
    async searchNow() {
      if (!this.query) return
      this.emptySearchResult()
      this.loading = true
      this.noResult = false
      await this.search({ series_type: this.series_type2word, query: this.query })
      this.loading = false
      if (!this.searchResult.length) this.noResult = true
    },
    toAnimeDetail(e) {
      let type = this.series_type ? 'manga' : 'anime'
      this.$router.push({ name: 'SeriesDetail', params: { type, id: e.currentTarget.dataset.id } })
    },
    year(start_date_fuzzy) {
      return Math.floor(start_date_fuzzy / 10000) || ''
    }
  },
  activated() {
    this.setAppHeader({
      show: false
    })
    this.showBottomNav()
  }
}
</script>
<style lang="stylus" scoped>
.app-search-series
    display flex
    flex-direction column
    background-color #fff

header
    display flex
    align-items center
    height 52px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

    .search-input
        width 100%
        outline none
        font-size 16px
        height 50px

    .search-btn
        color #959595

.search-content
    flex 1
    overflow scroll
    background-color #eee

form
    flex 1

.search-loading
    padding-top 30%
    display flex
    justify-content center
    background-color #eee

li
    list-style-type none


</style>
