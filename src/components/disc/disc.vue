<template>
  <transition name="slider">
    <div class="disc">
      <v-music-list :title="title" :bg-image="bgImage" :songs="songs"></v-music-list>
    </div>
  </transition>
</template>

<script>
import vMusicList from '@/components/music-list/music-list';
import {getSongList} from '@/api/recommend';
import {ERR_OK} from '@/api/config';
import {mapGetters} from 'vuex';
import {createSong} from '@/common/js/song'
import {getSongUrl} from '@/api/song'

export default {
  name: 'disc',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend');
        return;
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData, index) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
          getSongUrl(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              let data = res.data.items[0];
              ret[index].url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=8421138817&uin=0&fromtag=66`;
            }
          });
        }
      })
      return ret;
    }
  },
  components: {
    vMusicList
  },
  created() {
    this._getSongList();
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all .4
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>


