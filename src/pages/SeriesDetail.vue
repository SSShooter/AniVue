<template>
  <div class="series-detail">
    <v-container grid-list-lg>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs4>
          <img :src="pageData.image_url_med" width="100%">
        </v-flex>
        <v-flex xs8 class="pl-3">
          <p class="title">{{pageData.title_japanese}}</p>
          <p class="english-title">{{pageData.title_english}}</p>
          <p>{{year}}</p>
          <p>类型 {{genres}}</p>
        </v-flex>
        <v-flex xs12>
          <div class="rate" style="display:inline-block">
            <div class="star">
              <div class="current-star" :style="{width: pageData.mean_score + '%'}"></div>
            </div>
          </div>
          <span style="vertical-align:top;color:#737373">{{pageData.popularity}}</span>
          <v-icon style="vertical-align:top;color:#737373">people</v-icon>
        </v-flex>
        <v-flex xs12 class="description-wrapper" :style="{height:descriptToggle?'100px':'auto'}" @click="descriptToggle=!descriptToggle">
          <p class="description" v-html="pageData.description"></p>
          <span class="paragraph-end" v-show="descriptToggle"></span>
        </v-flex>
        <v-flex xs12>
          <v-list subheader two-line>
            <v-subheader class="gray--text">主要角色</v-subheader>
            <v-list-tile avatar v-for="item in pageData.characters" v-bind:key="item.id">
              <v-list-tile-avatar>
                <img class="character-avatar" :style="{backgroundImage:'url('+item.image_url_med+')'}">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.name_first}} {{item.name_last||''}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="item.actor.length">{{'cv ' + item.actor[0].name_first + ' ' + (item.actor[0].name_last||'')}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon class="gray--text">navigate_next</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'series-detail',
  data() {
    return {
      pageData: {},
      descriptToggle: true
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
      'page'
    ])
  },
  computed: {
    year() {
      if (!this.pageData.start_date_fuzzy) return
      let temp = this.pageData.start_date_fuzzy.toString()
      return temp.substring(0, 4) + '年' + Number(temp.substring(4, 6)) + '月' + Number(temp.substring(6, 8)) + '日'
    },
    genres() {
      if (!this.pageData.genres) return
      return this.pageData.genres.join(' ')
    }
  },
  created() {
    this.setAppHeader({
      show: true,
      title: 'Lavas',
      showMenu: false,
      showBack: true,
      showLogo: false,
      actions: [
        {
          icon: 'home',
          route: {
            name: 'home'
          }
        }
      ]
    })
    this.hideBottomNav()
  },
  mounted() {
    console.log(this.$route.params.id)
    this.page({ series_type: this.$route.params.type, id: this.$route.params.id })
      .then(res => {
        console.log(res.data)
        this.pageData = res.data
      })
  }
}
</script>
<style lang="stylus" scoped>
* 
  color #212121

p 
  margin-bottom 3px

.title, .english-title
  margin-bottom 10px
  white-space:nowrap
  overflow-x scroll
  overflow-y hidden

.description-wrapper
  position relative
  overflow hidden
  
  .description
    color #616161

  .paragraph-end
    position absolute
    bottom 0
    height: 100px
    width: 100%
    background-image -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,1))
    background linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1))

.character-avatar
  background-size 100%
</style>


