<template>
  <div class="song_list_item">
    <div class="section play_pause">
      <RippleSpinner v-if="state == 'loading'"></RippleSpinner>
      <img v-else-if="state == 'playing'" src="../assets/icons/pause.svg" alt="pause" @click="pause">
      <img v-else src="../assets/icons/play.svg" alt="" @click="play">
    </div>
    <div class="section song_name">
      {{song.name}}
    </div>
    <div class="section options">
      <img src="../assets/icons/info.svg" alt="">
    </div>
  </div>
</template>

<script>
import Base64 from 'base64-arraybuffer'
import { Howl } from 'howler'
import { mapState } from 'vuex'
import RippleSpinner from './RippleSpinner'
export default {
  name: 'songlistitem',

  props: {
    song: Object,
    playing: Boolean
  },

  components: {
    RippleSpinner,
  },

  computed: {
    ...mapState(['ipfsInstance']),
  },

  data() {
    return {
      audio: null,
      state: 'loading',
    }
  },
  
  async created() {
    let self = this;
    await this.ipfsInstance.cat(this.song.hash, function(err, files) {
      console.log(err);
      self.audio = new Howl({
        src: ["data:audio/mp3;base64," + Base64.encode(files.buffer)],
        preload: true,
        onload: function() { self.state = 'paused' },
        onloaderror: function(id, error) { console.log('loadError: ' + id +' - ' + error)},
        onplay: function() { self.state = 'playing' },
        onpause: function() { self.state = 'paused' },
      });
    });
  },

  methods: {
    pause() {
      this.audio.pause();
    },

    play() {
      this.audio.play();
    }
  }
}
</script>