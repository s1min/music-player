<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tab'
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"

.tab
  display: flex
  height: 40px
  line-height: 40px
  font-size: $font-size-medium-x
  background: #ffffff
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      paddign-bottom: 5px
      color: rgba(0, 0, 0, .6)
    &.router-link-active
      border-bottom: 2px solid $color-theme
      .tab-link
        color: $color-theme
</style>
