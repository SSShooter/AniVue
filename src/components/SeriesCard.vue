<template>
  <v-flex class="item" xs6>
    <v-card height="100%" :data-id="item.id" @click="toAnimeDetail($event)">
      <v-card-media v-lazy:background-image="item.image_url_lge" height="200px"></v-card-media>
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
</template>
<script>
export default {
  props: ['item','type'],
  methods: {
    year(start_date_fuzzy) {
      return Math.floor(start_date_fuzzy / 10000) || ''
    },
    toAnimeDetail(e) {
      let type = this.type ? 'manga' : 'anime'
      this.$router.push({ name: 'SeriesDetail', params: { type, id: e.currentTarget.dataset.id } })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>


