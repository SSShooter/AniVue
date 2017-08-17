<template>
  <div class="app-search-series">
    <header>
      <v-btn light icon class="search-btn" @click="searchNow">
        <v-icon class="search-icon">search</v-icon>
      </v-btn>
      <form @submit.prevent="searchNow">
        <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" />
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
      <v-layout v-if="searchResult && searchResult.length" class="wrapper" row wrap>
        <v-flex class="item" xs6 v-for="item in searchResult">
          <v-card height="100%" :data-id="item.id" @click="toAnimeDetail($event)">
            <v-card-media v-lazy:background-image="item.image_url_lge" height="230px"></v-card-media>
            <div class="details">
              <div class="series-title">{{item.title_japanese}}
                <span class="paragraph-end"></span>
              </div>
              <div class="series-type">{{item.type}} {{year(item.start_date_fuzzy)}}</div>
            </div>
            <div class="rate">
              <div class="star">
                <div class="current-star" :style="{width: item.mean_score + '%'}"></div>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'searchSeries',
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
      'hideBottomNav'
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
      console.log(e.currentTarget.dataset.id)
    },
    year(start_date_fuzzy) {
      return Math.floor(start_date_fuzzy / 10000) || ''
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

    .wrapper
        box-sizing border-box
        margin 0 20px

        .item
            height 310px
            margin 10px 0
            width 100%

            .card
                background-color #fff
            
            .card__media
                background-position center center
                background-size contain
                background-repeat no-repeat

            .series-type
                text-align left
                color #616161

            .series-year
                text-align left
                color #616161

            .series-title
                color #212121
                font-size 16px
                line-height 18px
                max-height 36px
                min-height 18px
                overflow hidden
                position relative
                white-space nowrap
                text-align left

            .paragraph-end
                position absolute
                right 0
                height: 19px
                width: 45px
                background-image -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,1))
                background linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,1))

            .details
                box-sizing border-box
                overflow hidden
                padding 7px 7px 0
            
            .rate
                position absolute
                bottom 0
                padding 0 7px 7px
          

form
    flex 1

.search-loading
    padding-top 30%
    display flex
    justify-content center
    background-color #eee

li
    list-style-type none

@css {
  .star{
    height:20px;
    width:100px;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAQAAADYBBcfAAAA70lEQVR4AdXUIQjCQBTGcYNgMAt2BGGdZbHY28BeLKvaBIPJYLHYMf/tbX2w9V62OgZj2wljjKHP3W5FvK/cHe8Hd+/gRmpgfgalwVHa1UKWlCyHwAuKizFkQowiZmIKt6gqW1Po1dAzglioJlYnZIbFGgeXM3fCFgy5c8bFYY3F7B2eUL1y+jgqrp7hinfEIetAGc7X5rAhkRkJm86uYhMJLMLWPgc7Ae56vCM3Ad76QF+AvhYyJW/Ky2aWM9XBVV1acGXOlaJer3TwUJUF2E2Xg2rnoINPUvaMW3cesyflqYMPFsJvsOAhQ/P8E3wB75uY7oxINXcAAAAASUVORK5CYII=);
    background-size:contain;
    background-repeat :repeat-x;
  }
  .current-star{
    height:20px;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAQAAADYBBcfAAAA60lEQVR4AdXTIQjCQBTGcYNgMAt2BGGdZbHY28BeLAv/ok0wmAwWix37elsfbL2XrY7B2HbCGGPobW9bUr5yd7wf3L3HTdTI/BTkPAqypmA9Bt5Q3AZDZkQoImZD4R5VZj8UuhV0B0EMVB2jE7LAYIuFzZUnQQMGPLliY7HFYPEJL6heuXxdFVtm2No3YpF2oBSrtTnsiFtYzK6zq5iEGhZiiuPgoIGHHnPkoYGPPtDTQE+EzMnq8qJeZcwluKlKc+4suZNX+40ET2WZj1l32S9PThJ0SDgybZxMOZLgSPDFSvNbVrwEKOcP4Rt15kTMQuVR7QAAAABJRU5ErkJggg==);
    background-size:contain;
    background-repeat :repeat-x;
  }
}
</style>
