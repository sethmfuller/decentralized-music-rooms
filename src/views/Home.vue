<template>
  <div id="home" class="home page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">Your Rooms</h1>
    </div>

    <div v-if="rooms.length == 0" class="no-rooms">
      No Rooms Yet
    </div>
    <div v-else class="rooms">
      <RoomItem v-for="(room, index) in rooms" :key="index" :room="room"></RoomItem>
    </div>

    <div class="create-room-container">
      <CreateRoomButton></CreateRoomButton>
    </div>
  </div>
</template>

<script>
import RoomItem from '../components/RoomItem'
import CreateRoomButton from '../components/CreateRoomButton'
import { mapState } from 'vuex'
export default {
  name: 'home',

  components: {
    RoomItem,
    CreateRoomButton,
  },

  computed: {
    ...mapState(['ipfsInstance', 'rooms'])
  },
}
</script>