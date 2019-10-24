<template>
  <div class="audio_player">
    <div class="controls">
      <img src="../assets/icons/rewind.svg" alt="rewind button">
      <img v-show="playing" src="../assets/icons/pause_circle.svg" alt="pause button" @click="playing ? pause() : play()">
      <img v-show="!playing" src="../assets/icons/play_circle.svg" alt="pause button" @click="playing ? pause() : play()">
      <img src="../assets/icons/fast_forward.svg" alt="fastforward button">
    </div>

    <div class="song_name">A Song</div>
    
    <div class="progress">
      <span class="running_time">1:25</span>
      <div class="progress_bar">
        <div class="progress"></div>
      </div>
      <span class="total_time">3:26</span>
    </div>
  </div>
</template>

<script>
// import {Howl, Howler} from 'howler'
export default {
  name: 'audioplayer',

  props: ['fileName'],

  data: () => ({
    playing: false,
    audio: Object,
  }),

  mounted() {
    
  },

  methods: {
    play() {
      try {
        var myAudio = document.createElement("audio");
        myAudio.src = "./sample1.mp3";
        myAudio.play();
      }
      catch (e) {
        console.log(e)
      }
    },

    pause() {
      // this.audio.pause();
      this.playing = false;
    }
  },
}
</script>