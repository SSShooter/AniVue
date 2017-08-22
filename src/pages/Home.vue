<template>
  <div class="app-home">
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'home',
  props: {},
  data() {
    return {

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
      showLogo: true,
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
