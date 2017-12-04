<template>
  <div class="header">
      <i class="logo"></i>
      <router-link class="mine" tag="div" to="/user">
        <i class="icon-mine"></i>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.header
  position: relative 
  height: 44px
  text-align: center
  background: $color-theme
  .logo
    float: left 
    display: inline-block
    width: 90px
    height: 25px
    margin: 9px 0 0 10px
    background-image: url('../../common/image/logo.png')
    background-size: cover
    background-repeat: no-repeat
  .mine
    position: absolute
    top: 0
    right: 0
    .icon-mine
      display: inline-block
      padding: 12px
      font-size: 20px;
      color: #C2EDD8
</style>


