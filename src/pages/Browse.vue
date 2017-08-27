<template>
  <div class="app-browse" @scroll="listenSrcoll($event)">
      <v-snackbar v-model="noResult" :timeout="2000" absolute primary>
        No result
      </v-snackbar>
    <search-field v-model="query" :searchFunc="searchNow" :isShow="result.length" :isLoading="loading"></search-field>
    <v-layout v-if="result && result.length" class="series-wrapper" row wrap>
      <v-flex xs12 @click="openSearchDiv" class="elevation-0 white">
        <v-btn flat>
          <v-icon>keyboard_arrow_up</v-icon>search</v-btn>
      </v-flex>
      <series-card v-for="item in result" :item="item" :key="item.id"></series-card>
    </v-layout>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SeriesCard from '@/components/SeriesCard'
import SearchField from '@/components/SearchField'

export default {
  components: { SeriesCard,SearchField },
  data() {
    return {
      noResult:false,
      loading: false,
      busy: false, // infinite
      query: {},
      result: []
    }
  },
  activated() {
    this.setAppHeader({
      show: true,
      title: 'Anivue',
      showBack: false,
      showLogo: true,
      showMenu: false,
      actions: [
      ]
    })
    this.activateBottomNav('browse')
    this.showBottomNav()
  },
  methods: {
    ...mapActions('anilistApi/browse', [
      'search'
    ]),
    ...mapActions('appShell/appHeader', [
      'setAppHeader'
    ]),
    ...mapActions('appShell/appBottomNavigator', [
      'showBottomNav',
      'activateBottomNav'
    ]),
    searchNow() {
      this.loading = true
      let withoutNull = {}
      for (let key in this.query) {
        if (this.query[key] && key!='desc')
          withoutNull[key] = this.query[key]
      }
      if (this.query.desc && withoutNull.sort) withoutNull.sort = withoutNull.sort + '-desc'
      this.search(withoutNull)
        .then(res => {
          if(!res.data.length) this.noResult = true
          this.loading = false
          this.result = res.data
        })
    },
    listenSrcoll(e) {
      let bottom = document.querySelector('.series-wrapper').getBoundingClientRect().bottom
      if (bottom < 700 && !this.busy)
        this.loadMore()
    },
    loadMore() {
      this.busy = true
      this.query.page += 1
      let withoutNull = {}
      for (let key in this.query) {
        if (this.query[key])
          withoutNull[key] = this.query[key]
      }
      if (this.desc && withoutNull.sort) withoutNull.sort = withoutNull.sort + '-desc'
      this.search(withoutNull)
        .then(res => {
          console.log(res.data)
          if(!res.data.length) this.noResult = true
          this.busy = false
          this.result.push(...res.data)
        })
    },
    openSearchDiv() {
      this.result = []
    },
    backTop() {
      document.querySelector('.app-browse').scrollTop = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.input-group
  padding-bottom 0

.search-wrapper
  transition all 1s
  overflow hidden
  padding-top 0
  padding-bottom 0
</style>

