<template>
  <v-container fluid class="search-wrapper" :style="{'max-height':isShow?0:'1000px',opacity:isShow?0:1,'pointer-events':isShow?'none':'auto'}">
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
            <v-checkbox label="desc" v-model="query.desc" color="primary"></v-checkbox>
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
    <v-btn @click="searchFunc">
      <v-progress-circular v-if="isLoading" :size="24" indeterminate></v-progress-circular>
      <v-icon v-else>search</v-icon>
      <span style="margin-left:5px;">search</span>
    </v-btn>
  </v-container>
</template>
<script>
export default {
  props: ['isShow', 'isLoading', 'searchFunc'],
  watch: {
    query: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  data() {
    return {
      query: {
        desc: false,
        year: '',
        season: '',
        type: '',
        status: '',
        genres: '',
        genres_exclude: '',
        sort: '',
        airing_data: '',
        full_page: '',
        page: 1
      },
      yearList: Array(50).fill(0).map((v, i) => {
        return new Date().getFullYear() - i
      }),
      seasonList: ['winter', 'spring', 'summer', 'fall'],
      typeList: ["TV", "TV Short", "Movie", "Special", "OVA", "ONA", "Music", "Manga", "Novel", "One Shot", "Doujin", "Manhua", "Manhwa"],
      statusList: ["finished airing", "currently airing", "not yet aired", "cancelled"],
      genreList: ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Hentai", "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"],
      sortList: ["id", "score", "popularity", "start_date", "end_date"],
    }
  },
  methods: {
    emitQuery() {
      this.$emit('input', this.query)
    }
  }
}
</script>

<style>

</style>

