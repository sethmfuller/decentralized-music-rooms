<template>
  <div id="room" class="page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">{{room.name}}</h1>
      <div class="big_button" @click="openUploadDialog">Upload</div>
    </div>
    <div class="more_info">
      <div class="members">
        <img src="../assets/icons/user.svg" alt="user count">
        <span>{{memberCount}}</span>
      </div>
      <div class="song_count">
        <span>{{room.songs.length}} Song(s)</span>
      </div>
    </div>
    <div class="now_playing">
      <AudioPlayer :fileName="'../../audio/sample.mp3'" :song="currentlyLoadedSong"></AudioPlayer>
    </div>
    <div class="song_list">
      <SongListItem v-for="song in room.songs" :key="song.hash" :song="song" :playing="false" @play="triggerAudioPlayer"></SongListItem>
    </div>

    <UploadDialog :room="room" @close="closeUploadDialog" v-if="uploadDialogOpen"></UploadDialog>
  </div>
</template>

<script>
import AudioPlayer from '../components/AudioPlayer'
import SongListItem from '../components/SongListItem'
import UploadDialog from '../components/UploadDialog'
import { mapState } from "vuex";
export default {
  name: 'room',

  components: {
    AudioPlayer,
    SongListItem,
    UploadDialog,
  },

  data: () => ({
    uploadDialogOpen: false,
    currentlyLoadedSong: null,
  }),

  computed: {
    ...mapState(['ipfsInstance', 'rooms']),

    room() {
      let roomName = this.$route.params.RoomName;
      return this.rooms.find(room => room.name == roomName);
    },

    memberCount() {
      return this.room.obj.getPeers().length + 1;
    },
  },

  methods: {
    closeUploadDialog() {
      this.uploadDialogOpen = false;
    },

    openUploadDialog() {
      this.uploadDialogOpen = true;
    },

    triggerAudioPlayer(song) {
      this.currentlyLoadedSong = song;
    }
  },

  created() {
    // this.songs[1] = {
    //   id: Math.random() * 100,
    //   name: "Another Song",
    //   src: "../assets/sample.mp3"
    // };
  },
}
</script>