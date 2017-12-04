<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-player></v-player>
  </div>
</template>

<script>
import vHeader from '@/components/header/header'
import vTab from '@/components/tab/tab'
import vPlayer from '@/components/player/player'

export default {
  name: 'app',
  components: {
    vHeader,
    vTab,
    vPlayer
  }
}
</script>

<style lang="stylus" scoped>
#app
  background-color: #f4f4f4
</style>
