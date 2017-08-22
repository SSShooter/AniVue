<template>
  <div class="app-browse">
    <v-container fluid class="search-wrapper" :style="{'max-height':result.length?0:'1000px',opacity:result.length?0:1,'pointer-events':result.length?'none':'auto'}">
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6>
              <v-select bottom v-bind:items="yearList" v-model="query.year" label="year" single-line></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select bottom v-bind:items="seasonList" v-model="query.season" label="season" single-line></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select bottom v-bind:items="statusList" v-model="query.status" label="status" single-line></v-select>
            </v-flex>
            <v-flex xs9>
              <v-select bottom v-bind:items="sortList" v-model="query.sort" label="sort" single-line></v-select>
            </v-flex>
            <v-flex xs3>
              <v-checkbox label="desc" v-model="desc"></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-select bottom v-bind:items="genreList" v-model="query.genre" label="genre" single-line></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select bottom v-bind:items="typeList" v-model="query.type" label="type" single-line></v-select>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn @click="searchNow">
        <v-progress-circular v-if="loading" :size="24" indeterminate></v-progress-circular>
        <v-icon v-else>search</v-icon>
        <span style="margin-left:5px;">search</span>
      </v-btn>
    </v-container>
    <v-layout v-if="result && result.length" class="series-wrapper" @scroll="test($event)" row wrap>
      <v-flex xs12 @click="openSearchDiv" class="elevation-0 white">
        <v-btn flat>
          <v-icon>keyboard_arrow_up</v-icon>search</v-btn>
      </v-flex>
      <v-flex class="item" xs6 v-for="item in result">
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
              <div class="current-star" :style="{width: (item.average_score || 0) + '%'}"></div>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      busy: false, // infinite
      desc: false,
      yearList: Array(50).fill(0).map((v, i) => {
        return new Date().getFullYear() - i
      }),
      seasonList: ['winter', 'spring', 'summer', 'fall'],
      typeList: ["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music", "Manga", "Novel", "One Shot", "Doujin", "Manhua", "Manhwa"],
      statusList: ["finished airing", "currently airing", "not yet aired", "cancelled"],
      genreList: ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Hentai", "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"],
      sortList: ["id", "score", "popularity", "start_date", "end_date"],
      query: {
        year: '',
        season: '',
        type: '',
        status: '',
        genres: '',
        genres_exclude: '',
        sort: '',
        airing_data: '',
        full_page: '',
        page: ''
      },
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
    window.addEventListener('scroll', function(e){console.log(e)});
  },
  mounted() {
    window.addEventListener('scroll', function(e){console.log(e)});
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
        if (this.query[key])
          withoutNull[key] = this.query[key]
      }
      if (this.desc && withoutNull.sort) withoutNull.sort = withoutNull.sort + '-desc'
      this.search(withoutNull)
        .then(res => {
          this.loading = false
          this.result = res.data
        })
    },
    test(e){console.log(e)},
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
          this.busy = false
          this.result.push(res.data)
        })
    },
    openSearchDiv() {
      this.result = []
    },
    toAnimeDetail(e) {
      let type = this.series_type ? 'manga' : 'anime'
      this.$router.push({ name: 'SeriesDetail', params: { type, id: e.currentTarget.dataset.id } })
    },
    year(start_date_fuzzy) {
      return Math.floor(start_date_fuzzy / 10000) || ''
    }
  },

}
</script>

<style lang="stylus" scoped>
.input-group
  padding-bottom 0

.search-wrapper
  transition all 1s
  overflow hidden
  padding-top 0
</style>

