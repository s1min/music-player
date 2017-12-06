<template>
  <transition name="slide">
    <div class="user">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper"></div>
      <div class="play-btn" ref="playBtn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'user'
}
</script>

<style lang="stylus" scoped>

</style>
