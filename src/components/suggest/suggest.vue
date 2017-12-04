<template>
  <v-scroll class="suggest" ref="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="content" v-if="item.type">
          <h2 class="name" v-html="item.singername"></h2>
          <span class="desc">单曲：{{item.songnum}}</span>
          <span class="desc">专辑：{{item.albumnum}}</span>
        </div>
        <div class="content" v-if="!item.type">
          <h2 class="name" v-html="item.name"></h2>
          <p class="desc" v-html="getDesc(item)"></p>
        </div>
      </li>
      <v-loading v-show="hasMore" title=""></v-loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <v-no-result title="抱歉，暂无搜索结果"></v-no-result>
    </div>
  </v-scroll>
</template>

<script>
import {search} from '@/api/search'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'
import {getSongUrl} from '@/api/song'
import vScroll from '@/base/scroll/scroll'
import vLoading from '@/base/loading/loading'
import Singer from '@/common/js/singer'
import vNoResult from '@/base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  name: 'suggest',
  components: {
    vScroll,
    vLoading,
    vNoResult
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  methods: {
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        });
        this.$router.push({
          path: `/search/${singer.id}`
        });
      }
    },
    search() {
      this.page = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._getResult(res.data);
          console.log(this.result);
          this._checkMore(res.data);
        }
      });
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data));
          this._checkMore(res.data);
        }
      });
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine';
      } else {
        return 'icon-music';
      }
    },
    getDesc(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.singer}·${item.album}`;
      }
    },
    _getResult(data) {
      let ret = [];
      console.log(data);
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}});
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item, index) => {
        if (item.songid && item.albumid) {
          ret.push(createSong(item));
          getSongUrl(item.songmid).then((res) => {
            if (res.code === ERR_OK) {
              let data = res.data.items[0];
              ret[index].url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=8421138817&uin=0&fromtag=66`;
            }
          });
        }
      });
      return ret;
    },
    _checkMore(data) {
      const song = data.song;
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false;
      }
    }
  },
  watch: {
    query() {
      this.search();
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.suggest
  height: 100%
  overflow: hidden
  .suggest-list
    padding: 20px
    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px
    .icon
      flex: 0 0 40px
      width: 30px
      [class^="icon-"]
        font-size: 24px
        color: #aaaaaa
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
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>

