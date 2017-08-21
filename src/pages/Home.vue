<template>
  <div class="app-home"></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'home',
  props: {},
  data() {
    return {
      anime: {},
      comic: {},
      staff: {}, e1: null,
      e2: null,
      e3: null,
      e4: null,
      items: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ]
    }
  },
  methods: {
    ...mapActions('appShell/appHeader', [
      'setAppHeader'
    ]),
    ...mapActions('appShell/appBottomNavigator', [
      'showBottomNav',
      'activateBottomNav'
    ])
  },
  async asyncData() {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 500)
    })
  },
  activated() {
    this.setAppHeader({
      show: true,
      title: 'Anivue',
      showBack: false,
      showLogo: false,
      showMenu:false,
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
