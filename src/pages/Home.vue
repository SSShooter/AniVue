<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Standard</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select v-bind:items="items" v-model="e1" label="Select" single-line bottom></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Standard with focus</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select v-bind:items="items" v-model="e2" label="Select" class="input-group--focused" item-value="text"></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Error</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select label="Select" v-bind:items="items" v-model="e3" v-bind:rules="[() => e3 && e3.text && e3.text.length > 0 || 'Please select an option']" item-value="text"></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Disabled</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select label="Select" v-bind:items="items" v-model="e4" disabled></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
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
