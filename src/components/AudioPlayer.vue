<template>
  <div class="audio_player">
    <div class="controls">
      <img src="../assets/icons/rewind.svg" alt="rewind button">
      <img v-show="playing" src="../assets/icons/pause_circle.svg" alt="pause button" @click="playing ? pause() : play()">
      <img v-show="!playing" src="../assets/icons/play_circle.svg" alt="pause button" @click="playing ? pause() : play()">
      <img src="../assets/icons/fast_forward.svg" alt="fastforward button">
    </div>

    <!-- <div class="song_name">A Song</div> -->
    
    <div class="progress">
      <span class="running_time">{{timeRemaining}}</span>
      <div class="progress_bar">
        <div class="progress"></div>
      </div>
      <span class="total_time">{{audioLength}}</span>
    </div>
  </div>
</template>

<script>
import {Howl} from 'howler'
export default {
  name: 'audioplayer',

  props: ['fileName', 'song'],

  data() {
    return {
      playing: false,
      audio: Object,
      audioLength: "0:00",
      timeRemaining: `0:00`,
    }
  },

  created() {
    let self = this;
    this.audio = new Howl({
      src: [self.fileName],
      preload: true,
      onload: function() { self.audioLength = self.formattedTime(this.duration()) },
      onloaderror: function(id, error) { console.log('loadError: ' + id +' - ' + error)},
      onplay: function() { self.playing = true },
      onpause: function() { self.playing = false }
    });

    setInterval(() => {
      self.timeRemaining = self.formattedTime(self.audio.seek());
    }, 100);
  },

  methods: {
    async play() {
      this.audio.play();
    },

    pause() {
      this.audio.pause();
    },

    formattedTime(time) {
      let tempTime = Math.round(time);
      if (isNaN(tempTime)) return "0:00";

      let minutes = Math.floor(tempTime / 60);
      let seconds = tempTime % 60;
      if (seconds < 10)
      {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    }
  },
}
</script>