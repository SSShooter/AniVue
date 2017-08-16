<template>
  <transition name="slide-down">
    <header>
      <v-btn light icon class="search-btn" @click.native="search">
        <v-icon class="search-icon">search</v-icon>
      </v-btn>
      <form @submit.prevent="search">
        <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" />
      </form>
      <v-btn light icon class="search-btn" @click.native="query = ''">
        <v-icon class="search-icon">close</v-icon>
      </v-btn>
    </header>
  </transition>
</template>
<style lang="stylus" scoped>
header
    position fixed
    display flex
    align-items center
    height 52px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

</style>
