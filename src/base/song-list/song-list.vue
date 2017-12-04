<template>
  <div class="song-list">
    <ul>
      <li class="item" @click="selectItem(song, index)" v-for="(song, index) in songs">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="content">
          <h2 class="name" :style="{color: currentIndex === index ? '#31c27c' : ''}">{{song.name}}</h2>
          <p class="desc" :style="{color: currentIndex === index ? '#31c27c' : ''}">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'song-list',
  props: {
    songs: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`;
    },
    selectItem(item, index) {
      this.$emit('select', item, index);
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return 'text';
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1;
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.song-list
  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    .rank
      flex: 0 0 25px
      width: 25px
      margin-right: 30px
      text-align: center
      .icon
        display: inline-block
        width: 25px
        height: 24px
        background-size: 25px 24px
        &.icon0
          bg-image('first')
        &.icon1
          bg-image('second')
        &.icon2
          bg-image('third')
      .text
        color: $color-theme
        font-size: $font-size-large
    .content
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        no-wrap()
        font-size: $font-size-medium
      .desc
        no-wrap()
        margin-top: 4px
        font-size: $font-size-small
        color: #aaaaaa
</style>

