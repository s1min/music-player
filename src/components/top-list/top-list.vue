<template>
  <transition name="slide">
    <v-music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></v-music-list>
  </transition>
</template>

<script>
import vMusicList from '@/components/music-list/music-list'
import {getMusicList} from '@/api/rank'
import {mapGetters} from 'vuex'
import {createSong} from '@/common/js/song'
import {ERR_OK} from '@/api/config'
import {getSongUrl} from '@/api/song'

export default {
  name: 'top-list',
  data() {
    return {
      songs: [],
      image: '',
      rank: true
    }
  },
  components: {
    vMusicList
  },
  computed: {
    title() {
      return this.topList.topTitle;
    },
    bgImage() {
      return this.image ? this.image : '';
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank');
        return;
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.image = res.topinfo.pic_album;
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item, index) => {
        const musicData = item.data;
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
    this._getMusicList();
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.4s ease
.slide-enter, .slide-enter-to
  transform: translate3d(100%, 0, 0)
</style>

