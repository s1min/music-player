<template>
  <transition name="slide">
    <v-music-list :title="title" :bg-image="bgImage" :songs="songs"></v-music-list>
  </transition>
</template>

<script>
import vMusicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'
import {getSongUrl} from '@/api/song'

export default {
  name: 'singer-detail',
  components: {
    vMusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      })
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item, index) => {
        let {musicData} = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
          getSongUrl(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              let data = res.data.items[0];
              ret[index].url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=8421138817&uin=0&fromtag=66`;
            }
          });
        }
      });
      return ret;
    }
  },
  created() {
    this._getSingerDetail();
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>


