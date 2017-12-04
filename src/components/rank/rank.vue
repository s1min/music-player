<template>
  <div class="rank">
    <v-scroll class="toplist" ref="toplist" :data="topList">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" :src="item.picUrl" alt="">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList">
              <span class="number">{{index + 1}}</span>
              <span class="name">{{song.songname}}</span>
              <span class="singer">- {{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-if="!topList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getTopList} from '@/api/rank.js'
import {ERR_OK} from '@/api/config'
import vScroll from '@/base/scroll/scroll'
import vLoading from '@/base/loading/loading'
import {mapMutations} from 'vuex'

export default {
  name: 'rank',
  components: {
    vScroll,
    vLoading
  },
  data() {
    return {
      topList: []
    }
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      });
      this.setTopList(item);
    },
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList;
        }
      });
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
  created() {
    this._getTopList();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  background: #f4f4f4
  .toplist
    height: 100%
    overflow: hidden
    .item
      display: flex
      margin: 10px
      height: 100px
      background: #ffffff
      &:last-child
        padding-bottom: 20px
      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px
      .songlist
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 20px
        height: 100px
        overflow: hidden
        font-size: $font-size-medium
        .song
          no-wrap()
          line-height: 26px
          .number
            color: #7f7f7f
          .name
            color: #000000
          .singer
            color: #7f7f7f
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
