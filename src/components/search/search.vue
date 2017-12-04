<template>
  <div class="search">
    <div class="search-box-wrapper">
      <v-search-box ref="searchBox" @query="onQueryChange"></v-search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <v-suggest :query="query"></v-suggest>
    </div>
  </div>
</template>

<script>
import vSearchBox from '@/base/search-box/search-box'
import {getHotKey} from '@/api/search'
import {ERR_OK} from '@/api/config'
import vSuggest from '@/components/suggest/suggest'

export default {
  name: 'search',
  components: {
    vSearchBox,
    vSuggest
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
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
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
  .search-result
    background: #ffffff
</style>
