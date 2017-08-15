<template>
  <div>
    <div class="content">
      <div class="anime">
        {{anime}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'home',
  props: {},
  data(){
    return{
      anime:{},
      comic:{},
      staff:{}
    }
  },
  methods: {
    ...mapActions('appShell/appHeader', [
      'setAppHeader'
    ]),
    ...mapActions('appShell/appBottomNavigator', [
      'showBottomNav',
      'activateBottomNav'
    ]),
    ...mapActions('anilistApi', [
      'searchSeries',
      'searchCharacter'
    ]),
  },
  async asyncData() {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500)
    })
  },
  activated() {
    this.setAppHeader({
      show: true,
      title: 'Lavas',
      showMenu: true,
      showBack: false,
      showLogo: true,
      actions: [
        {
          icon: 'search',
          route: '/search'
        }
      ]
    })
    this.activateBottomNav('home')
    this.showBottomNav()
    this.searchSeries({series_type:'anime',query:'aho'})
    this.searchCharacter('fre')
  }
}
</script>

<style lang="stylus" scoped>
$text-color := rgba($material-theme.text-color, $material-theme.primary-text-percent)

.content
    width 100%
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

    h2
        font-size 46px
        font-weight 500

    h2, h4
        color $text-color

</style>
