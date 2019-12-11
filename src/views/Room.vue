<template>
  <div id="room" class="page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">{{room.name}}</h1>
      <!-- <div  @click="upload">Upload</div> -->
      <label class="big_button" for="audioFile">
          Upload
          <input type="file" ref="audioFile" id="audioFile" alt="upload file" @input="upload">
      </label>
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
      <SongListItem v-for="song in room.songs" :key="song.hash" :song="song" @play="triggerAudioPlayer"></SongListItem>
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
    },

    async upload() {
      this.loading = true;

      // Get uploaded file
      const audio = document.getElementById("audioFile");

      // Add audio file to ipfs
      const results = await this.ipfsInstance.add(audio.files[0]);
      const hash = results[0].hash

      // By pinning the file, other nodes on the IPFS network know 
      // they can access the file from our machine.
      await this.ipfsInstance.pin.add(hash);

      let message = {
        messageName: 'uploaded song',
        roomName: this.room.name,
        songName: audio.files[0].name,
        hash: hash,
      };
      
      // Broadcast to all peers in room that a song has been uploaded
      this.room.obj.broadcast(`${JSON.stringify(message)}`);
    },
  },
}
</script>