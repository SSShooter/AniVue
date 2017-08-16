<template>
  <div class="app-search-series">
    <header>
      <v-btn light icon class="search-btn" @click.native="search">
        <v-icon class="search-icon">search</v-icon>
      </v-btn>
      <form @submit.prevent="search">
        <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" />
      </form>
      <v-btn light icon class="search-btn" @click.native="query = ''">
        <v-icon class="search-icon">close</v-icon>
      </v-btn>
    </header>
    <div v-if="loading" class="search-loading">
      <v-progress-circular indeterminate v-bind:size="70" class="primary--text"></v-progress-circular>
    </div>
    <div class="search-content">
      <v-layout class="wrapper" row wrap>
        <v-flex class="item" xs12 v-if="searchResult && searchResult.length" v-for="item in searchResult">
          <v-card class="primary white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <div>{{item.title_japanese}}</div>
                    <div>{{item.title_english}}</div>
                  </div>
                </v-flex>
                <v-flex xs5>
                  <v-card-media name="xx" :src="item.image_url_med" height="125px" contain></v-card-media>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState,mapMutations } from 'vuex'
export default {
  name: 'searchSeries',
  data() {
    return {
      query: '',
      data: [],
      loading: false
    }
  },
  computed: {
    ...mapState('anilistApi', [
      'token',
      'searchResult'
    ])
  },
  methods: {
    ...mapActions('appShell/appHeader', [
      'setAppHeader'
    ]),
    ...mapActions('appShell/appBottomNavigator', [
      'hideBottomNav'
    ]),
    ...mapActions('anilistApi/series', [
      'search'
    ]),
    ...mapMutations('anilistApi/series', [
      'emptySearchResult'
    ]),
    async search() {
      this.emptySearchResult()
      this.loading = true
      await this.search({ series_type: 'anime', query: this.query })
      this.loading = false
    }
  },
  activated() {
    this.setAppHeader({
      show: false
    })
  }
}
</script>
<style lang="stylus" scoped>
.app-search-series
    display flex
    flex-direction column

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
    .wrapper
        box-sizing border-box
        margin 0 20px

    .item
        margin 10px 0
        width 100%

form
    flex 1

.search-loading
    margin-top 30%
    display flex
    justify-content center




li
    list-style-type none
</style>
