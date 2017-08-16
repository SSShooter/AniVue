<template>
  <div class="app-search-series">
    <header>
      <v-btn light icon class="search-btn" @click.native="searchNow">
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
        <v-flex class="item" xs6 v-if="searchResult && searchResult.length" v-for="item in searchResult">
          <v-card height="100%">
            <v-card-media :src="item.image_url_lge" height="200px"></v-card-media>
            <div class="details">
              <div class="series-title">{{item.title_japanese}}
                <span class="paragraph-end"></span>
              </div>
              <div class="series-type">{{item.type}}</div>
            </div>
            <div class="star">
              <div class="current-star"></div>
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
      loading: false
    }
  },
  computed: {
    ...mapState('anilistApi/series', [
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
    async searchNow() {
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
            height 300px
            margin 10px 0
            width 100%
            
            .series-type
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
          
form
    flex 1

.search-loading
    margin-top 30%
    display flex
    justify-content center

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
    width:50%;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAQAAADYBBcfAAAA60lEQVR4AdXTIQjCQBTGcYNgMAt2BGGdZbHY28BeLAv/ok0wmAwWix37elsfbL2XrY7B2HbCGGPobW9bUr5yd7wf3L3HTdTI/BTkPAqypmA9Bt5Q3AZDZkQoImZD4R5VZj8UuhV0B0EMVB2jE7LAYIuFzZUnQQMGPLliY7HFYPEJL6heuXxdFVtm2No3YpF2oBSrtTnsiFtYzK6zq5iEGhZiiuPgoIGHHnPkoYGPPtDTQE+EzMnq8qJeZcwluKlKc+4suZNX+40ET2WZj1l32S9PThJ0SDgybZxMOZLgSPDFSvNbVrwEKOcP4Rt15kTMQuVR7QAAAABJRU5ErkJggg==);
    background-size:contain;
    background-repeat :repeat-x;
  }
}
</style>
