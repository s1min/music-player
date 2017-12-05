<template>
  <div class="search">
    <div class="search-box-wrapper">
      <v-search-box ref="searchBox" @query="onQueryChange"></v-search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <v-scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <v-search-list :searches="searchHistory" @select="addQuery" @delete="deleteOne"></v-search-list>
          </div>
        </div>
      </v-scroll>
    </div>
    <div class="search-result" v-show="query">
      <v-suggest ref="suggest" :query="query" @listScroll="blurInput" @select="saveSearch"></v-suggest>
    </div>
    <v-confirm ref="confirm" @confirm="deleteALL" text="是否清空所有搜索历史" confirmBtnText="清空"></v-confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import vSearchBox from '@/base/search-box/search-box'
import vSuggest from '@/components/suggest/suggest'
import vSearchList from '@/base/search-list/search-list'
import vConfirm from '@/base/confirm/confirm'
import vScroll from '@/base/scroll/scroll'
import {getHotKey} from '@/api/search'
import {ERR_OK} from '@/api/config'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'search',
  components: {
    vSearchBox,
    vSuggest,
    vSearchList,
    vConfirm,
    vScroll
  },
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  methods: {
    addQuery(k) {
      this.$refs.searchBox.setQuery(k);
    },
    onQueryChange(query) {
      this.query = query;
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    deleteOne(item) {
      this.deleteSearchHistory(item);
    },
    deleteALL() {
      this.clearSearchHistory();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory);
    },  
    ...mapGetters([
      'searchHistory'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh();
        }, 20);
      }
    }
  },
  created() {
    this._getHotKey();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.search
  .search-box-wrapper
    padding: 10px
    background: #f4f4f4
  .shortcut-wrapper
    position: fixed
    top: 144px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: #f4f4f4
          font-size: $font-size-medium
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 40px
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
  .search-result
    background: #ffffff
</style>
