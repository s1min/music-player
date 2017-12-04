<template>
  <div class="recommend">
    <v-scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <v-slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img @load="loadImage" class="needsclick" :src="item.picUrl" alt="">
                </a>
              </div>
            </v-slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-show="!discList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRecommend, getDiscList} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import vSlider from '@/base/slider/slider'
import vScroll from '@/base/scroll/scroll'
import vLoading from '@/base/loading/loading'
import {mapMutations} from 'vuex'

export default {
  name: 'recommend',
  components: {
    vSlider,
    vScroll,
    vLoading
  },
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      this.setDisc(item);
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        this.$refs.scroll.refresh();
      }
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"

.recommend 
  position: fixed
  width: 100%
  top: 84px
  bottom: 0
  background: #f4f4f4
  .recommend-content 
    height: 100%
    overflow: hidden
    .slider-wrapper 
      position: relative
      width: 100%
      height: 0
      padding-top: 40%
      margin-bottom: 10px
      overflow: hidden
      .slider-content 
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .recommend-list
      padding: 10px
      .list-title
        font-size: 16px
        color: #000
        margin-bottom: 10px
      .item
        display: flex
        box-sizing: border-box
        align-item: center
        padding: 10px 0
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: #000000
          .desc
            color: rgba(0, 0, 0, .6)
    .loading-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

