<template>
  <div class="app-browse">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-select bottom v-bind:items="yearList" v-model="query.year" label="year"></v-select>
          <v-select bottom v-bind:items="seasonList" v-model="query.season" label="season"></v-select>
          <v-select bottom v-bind:items="genreList" v-model="query.genre" label="genre"></v-select>
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
  methods: {
    ...mapActions('anilistApi/browse', [
      'search'
    ]),
    searchNow() {
      this.search(this.query)
        .then(res => {
          console.log(res)
        })
    }
  },

}
</script>

<style lang="stylus" scoped>
.input-group
  padding-bottom 0
</style>

