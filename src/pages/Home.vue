<template>
  <v-container class="app-home" fluid>
    <p style="font-size:28px;text-align:left;">New Anime</p>
    <v-card v-for="item in result" style="margin-bottom:20px" :key="item.id" :data-id="item.id" @click="toAnimeDetail($event)">
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs7>
            <div>
              <div class="headline">{{item.title_japanese}}</div>
            </div>
          </v-flex>
          <v-flex xs5>
            <v-card-media :src="item.image_url_med" height="125px" contain></v-card-media>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'home',
  props: {},
  data() {
    return {
      query: { sort: "id-desc", page: 1 },
      result: []
    }
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
    toAnimeDetail(e) {
      let type = this.type ? 'manga' : 'anime'
      this.$router.push({ name: 'SeriesDetail', params: { type, id: e.currentTarget.dataset.id } })
    }
  },
  async asyncData() {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500)
    })
  },
  async mounted() {
    let { data } = await this.search(this.query)
    for (let i = 0; i < 8; i++) {
      if (data[i].adult === false)
        this.result.push(data[i])
    }
    console.log(this.result)
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
    this.activateBottomNav('home')
    this.showBottomNav()
  }
}
</script>

<style lang="stylus" scoped>
$text-color := rgba($material-theme.text-color, $material-theme.primary-text-percent)


</style>
