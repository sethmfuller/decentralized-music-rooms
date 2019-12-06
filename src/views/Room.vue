<template>
  <div id="room" class="page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">{{currentRoom.name}}</h1>
      <div class="big_button" @click="openUploadDialog">Upload</div>
    </div>
    <div class="more_info">
      <div class="members">
        <img src="../assets/icons/user.svg" alt="user count">
        <span>{{memberCount}}</span>
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

    <UploadDialog @close="closeUploadDialog" v-if="uploadDialogOpen"></UploadDialog>
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
    songs: [],
    uploadDialogOpen: false,
  }),

  computed: {
    ...mapState(['currentRoom']),

    memberCount() {
      return this.currentRoom.obj.getPeers().length + 1;
    },
  },

  methods: {
    closeUploadDialog() {
      this.uploadDialogOpen = false;
    },

    openUploadDialog() {
      this.uploadDialogOpen = true;
    }
  },

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