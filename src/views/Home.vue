<template>
  <div id="home" class="home page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">Your Rooms</h1>
    </div>

    <div class="rooms">
      <RoomTile :addRoom=false @click="this.goToRoom()"></RoomTile>
      <RoomTile :addRoom=false></RoomTile>
      <RoomTile :addRoom=true></RoomTile>
    </div>

    <div class="other_rooms">
      <h2 class="other_rooms_title">Other Rooms</h2>
      <h3 class="other_rooms_subtitle">Listen to music in other great rooms!</h3>
      <div class="other_rooms_list">
        <div class="item">
          <img src="../assets/icons/box_unchecked.svg" alt="unchecked checkbox">
          <span class="room_name">Somebody's Music Room</span>
          <div class="big_button join_button">Ask to Join</div>
          <div class="members">
            <img src="../assets/icons/user.svg" alt="user count">
            <span>459</span>
          </div>
        </div>
        <div class="item">
          <img src="../assets/icons/box_unchecked.svg" alt="unchecked checkbox">
          <span class="room_name">A Person's Music Room</span>
          <div class="big_button join_button">Ask to Join</div>
          <div class="members">
            <img src="../assets/icons/user.svg" alt="user count">
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomTile from '../components/RoomTile'
export default {
  name: 'home',

  components: {
    RoomTile
  },

  methods: {
    goToRoom() {
      this.$router.push('/room');
    },
  }
}
</script>
