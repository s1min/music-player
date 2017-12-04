<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" type="text" v-model="query" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
export default {
  name: 'search-box',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲，歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query = '';
    },
    setQuery(query) {
      this.query = query;
    }
  },
  created() {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery);
    });
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"

.search-box
  display: flex
  align-items: center
  box-sizing: border-box
  width: 100%
  padding: 0 6px
  height: 40px
  background: #ffffff
  border-radius: 6px
  .icon-search
    font-size: 24px
    color: rgba(0, 0, 0 .3)
  .box
    flex: 1
    margin: 0 5px
    line-height: 18px
    color: rgba(0, 0, 0 .6)
    font-size: $font-size-medium
    outline: none
    &::placeholder
      color: rgba(0, 0, 0 .3)
  .icon-dismiss
    font-size: 16px
    color: rgba(0, 0, 0 .3)
</style>


