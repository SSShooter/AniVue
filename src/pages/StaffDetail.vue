<template>
  <div class="series-detail">
    <v-progress-circular indeterminate v-bind:size="70" class="primary--text" v-if="loading" style="margin-top:30%"></v-progress-circular>
    <v-container grid-list-lg v-else>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs4 style="height:160px;overflow:hidden;">
          <img :src="pageData.image_url_med" width="100%">
        </v-flex>
        <v-flex xs8 class="pl-3">
          <p class="staff-j-name">{{pageData.name_first_japanese + (pageData.name_last_japanese||'')}}</p>
          <p class="staff-e-name">{{pageData.name_first + ' ' + pageData.name_last}}</p>
          <p class="staff-info">{{pageData.info}}</p>
        </v-flex>
        <v-flex xs12>
          <v-list subheader two-line v-if="pageData.anime&&pageData.anime.length">
            <v-subheader class="gray--text">Filmography</v-subheader>
            <v-list-tile avatar v-for="item in pageData.anime" :key="item.id" :data-id="item.id" @click="toSeriesDetail">
              <v-list-tile-avatar>
                <img class="character-avatar" :style="{backgroundImage:'url('+item.characters[0].image_url_med+')'}">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.characters[0].name_first}} {{item.characters[0].name_last||''}}</v-list-tile-title>
                <v-list-tile-sub-title>from {{item.title_japanese}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon class="gray--text">navigate_next</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-list subheader two-line v-if="pageData.anime_staff&&pageData.anime_staff.length">
            <v-subheader class="gray--text">Staff Roles</v-subheader>
            <v-list-tile avatar v-for="item in pageData.anime_staff" :key="item.id" :data-id="item.id" @click="toSeriesDetail">
              <v-list-tile-avatar>
                <img class="character-avatar" :style="{backgroundImage:'url('+item.image_url_med+')'}">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.title_japanese}}</v-list-tile-title>
                <v-list-tile-sub-title>from {{item.role}}</v-list-tile-sub-title>
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
      loading: true,
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
    ...mapActions('anilistApi/staff', [
      'page'
    ]),
    toSeriesDetail(e) {
      this.$router.push('/seriesdetail/anime/' + e.currentTarget.dataset.id)
    }
  },
  created() {
    this.setAppHeader({
      show: true,
      title: 'Anivue',
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
    this.page(this.$route.params.id)
      .then(res => {
        this.pageData = res.data
        this.loading = false
      })
  }
}
</script>
<style lang="stylus" scoped>
* 
  color #212121

p 
  margin-bottom 3px

.staff-j-name, .staff-e-name
  margin-bottom 10px
  white-space:nowrap
  overflow-x scroll
  overflow-y hidden

.staff-info
  max-height 80px;
  overflow-y scroll

.character-avatar
  background-size 100%

</style>


