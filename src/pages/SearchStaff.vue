<template>
  <div class="app-search-staff">
    <header>
      <v-btn light icon class="search-btn" @click="searchNow">
        <v-icon class="search-icon">search</v-icon>
      </v-btn>
      <form @submit.prevent="searchNow">
        <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off">
      </form>
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
      <v-layout v-if="result && result.length" class="wrapper" row wrap>
        <v-flex class="item" xs6 v-for="item in result">
          <v-card height="100%" :data-id="item.id" @click="toStaffDetail($event)">
            <v-card-media v-lazy:background-image="item.image_url_lge" height="200px"></v-card-media>
            <div class="details">
              <div class="staff-j-name">{{item.name_first_japanese + ' ' + (item.name_last_japanese||'')}}
                <span class="paragraph-end"></span>
              </div>
              <div class="staff-e-name">{{item.name_first + ' ' + item.name_last}}
                <span class="paragraph-end"></span>
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
import router from 'vue-router'
export default {
  name: 'searchStaff',
  data() {
    return {
      query: '',
      result: [],
      loading: false,
      noResult: false
    }
  },
  computed: {
    ...mapState('anilistApi/staff', [
      'searchResult'
    ])
  },
  methods: {
    ...mapActions('appShell/appHeader', [
      'setAppHeader'
    ]),
    ...mapActions('appShell/appBottomNavigator', [
      'showBottomNav'
    ]),
    ...mapActions('anilistApi/staff', [
      'search'
    ]),
    ...mapMutations('anilistApi/staff', [
      'emptySearchResult'
    ]),
    async searchNow() {
      if (!this.query) return
      this.result = []
      this.loading = true
      this.noResult = false
      this.search(this.query)
        .then(res => {
          console.log(res)
          if (res.data.err) {
            this.noResult = true
            return
          }
          this.result = res.data
          this.loading = false
        })
    },
    toStaffDetail(e) {
      console.log( e.currentTarget.dataset.id)
      this.$router.push({ name: 'StaffDetail', params: { id: e.currentTarget.dataset.id } })
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
.app-search-staff
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
            height 260px
            margin 10px 0
            width 100%

            .card
                background-color #fff
            
            .card__media
                background-position center center
                background-size contain
                background-repeat no-repeat

            .staff-j-name,.staff-e-name
                color #212121
                line-height 18px
                overflow hidden
                position relative
                white-space nowrap
                text-align left
                margin-left 7px
                margin-top 7px
              
            .staff-j-name
                font-size 20px

                .paragraph-end
                    position absolute
                    right 0
                    height: 19px
                    width: 45px
                    background-image -webkit-linear-gradient(left,rgba(255,255,255,0),rgba(255,255,255,1))
                    background linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,1))

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
