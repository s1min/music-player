<template>
  <div class="loading">
    <img width="60" height="60" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped>
.loading
  width: 100%
  text-align: center
  .desc
    line-height: 20px
    font-size: 14px
    color: rgba(0, 0, 0, .6)
</style>

