<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <v-scroll class="list-content" ref="listContent">
          <transition-group ref="list">
            <li :key="item.id" class="item" v-for="(item, index) in sequenceList" @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text" :class="getCurrentText(item)">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span @click.stop="deleteOne(item)" class="delete">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </v-scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <v-confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></v-confirm>
      <v-add-song ref="addSong"></v-add-song>
    </div>
  </transition>
</template>

<script>
import {mapActions} from 'vuex'
import {playMode} from '@/common/js/config'
import {playerMixin} from '@/common/js/mixin'
import vScroll from '@/base/scroll/scroll'
import vConfirm from '@/base/confirm/confirm'
import vAddSong from '@/components/add-song/add-song'

export default {
  name: 'playlist',
  components: {
    vScroll,
    vAddSong,
    vConfirm
  },
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
      console.log(this.showFlag);
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    confirmClear() {
      this.deleteSongList();
      this.hide();
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play';
      }
      return '';
    },
    getCurrentText(item) {
      if (this.currentSong.id === item.id) {
        return 'current-text';
      }
      return '';
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300);
    },
    deleteOne(item) {
      this.deleteSong(item);
      if (!this.playlist.length) {
        this.hide();
      }
    },
    addSong() {
      this.$refs.addSong.show();
    },
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong);
      }, 20);
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环';
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.playlist
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 200
  &.list-fade-enter-active, &.list-fade-leave-active
    transition: opacity 0.3s
    .list-wrapper
      transition: all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity: 0
    .list-wrapper
      transform: translate3d(0, 100%, 0)
  .list-wrapper
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    background-color: rgba(51, 51, 51, .9)
    .list-header
      position: relative
      padding: 20px 30px 10px 20px
      .title
        display: flex
        align-items: center
        .icon
          margin-right: 10px
          font-size: 24px
          color: #aaaaaa
        .text
          flex: 1
          font-size: $font-size-medium
          color: #aaaaaa
        .clear
          extend-click()
          .icon-clear
            font-size: $font-size-medium
            color: #aaaaaa
    .list-content
      max-height: 240px
      overflow: hidden
      .item
        display: flex
        align-items: center
        height: 40px
        padding: 0 30px 0 20px
        overflow: hidden
        &.list-enter-active, &.list-leave-active
          transition: all 0.1s
        &.list-enter, &.list-leave-to
          height: 0
        .current
          flex: 0 0 20px
          width: 20px
          font-size: $font-size-small
          color: $color-theme
        .text
          flex: 1
          no-wrap()
          font-size: $font-size-medium
          color: #aaaaaa
        .current-text
          color: $color-theme
        .like
          extend-click()
          margin-right: 15px
          font-size: $font-size-small
          color: #aaaaaa
          .icon-favorite
            color: #d93f30
        .delete
          extend-click()
          font-size: $font-size-small
          color: #aaaaaa
    .list-operate
      width: 140px
      margin: 20px auto 30px auto
      .add
        display: flex
        align-items: center
        padding: 8px 16px
        border: 1px solid #aaaaaa
        border-radius: 100px
        color: #aaaaaa
        .icon-add
          margin-right: 5px
          font-size: $font-size-small-s
        .text
          font-size: $font-size-small
    .list-close
      text-align: center
      line-height: 50px
      background: #333333
      font-size: $font-size-medium-x
      color: #aaaaaa
</style>


