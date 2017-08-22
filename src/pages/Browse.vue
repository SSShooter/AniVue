<template>
  <div class="app-browse">
    <v-container fluid>
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
    </v-container>
    <v-btn @click="searchNow">search</v-btn>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
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
      }
    }
  },
  activated() {
    this.setAppHeader({
      show: true,
      title: 'Anivue',
      showBack: false,
      showLogo: true,
      showMenu:false,
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
      let withoutNull = {}
      for (let key in this.query) {
        if (this.query[key])
          withoutNull[key] = this.query[key]
      }
      if(this.desc&&withoutNull.sort)withoutNull.sort = withoutNull.sort + '-desc'
      this.search(withoutNull)
        .then(res => {
          console.log(res.data)
        })
    }
  },

}
</script>

<style lang="stylus" scoped>
.input-group
  padding-bottom 0
</style>

