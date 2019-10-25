<template>
  <div id="room" class="page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">Seth's Electronic Music</h1>
      <div class="big_button">Upload</div>
    </div>
    <div class="more_info">
      <div class="members">
        <img src="../assets/icons/user.svg" alt="user count">
        <span>10</span>
      </div>
      <div class="song_count">
        <span>43 Songs</span>
      </div>
    </div>
    <div class="now_playing">
      <AudioPlayer :fileName="'../../audio/sample.mp3'"></AudioPlayer>
    </div>
    <div class="song_list">
      <SongListItem v-for="song in songs" :key="song.id" :song="song" :playing="false"></SongListItem>
    </div>
  </div>
</template>

<script>
import AudioPlayer from '../components/AudioPlayer'
import SongListItem from '../components/SongListItem'
export default {
  name: 'room',

  components: {
    AudioPlayer,
    SongListItem
  },

  data: () => ({
    songs: []
  }),

  created() {
    this.songs[0] = {
      id: Math.random() * 100,
      name: "My Cool Song",
      src: "../assets/sample.mp3"
    };

    this.songs[1] = {
      id: Math.random() * 100,
      name: "Another Song",
      src: "../assets/sample.mp3"
    };
  },
}
</script>