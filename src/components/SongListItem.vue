<template>
  <div class="song_list_item">
    <div class="section play_pause">
      <img v-if="playing" src="../assets/icons/pause.svg" alt="pause">
      <img v-else src="../assets/icons/play.svg" alt="">
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
export default {
  name: 'songlistitem',

  props: {
    song: Object,
    playing: Boolean
  },

  methods: {
    pause() {
      this.$emit('pause');
    },

    play() {
      this.$emit('play', this.song);
    }
  }
}
</script>