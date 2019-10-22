<template>
  <div id="home" class="home page">
    <div class="page_title">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1>Your Rooms</h1>
    </div>

    <div class="rooms">
      <div class="room">
        <div class="room_title">Seth's Electronic Music</div>
        <div class="members">
          <img src="../assets/icons/user.svg" alt="user count">
          <span>3</span>
        </div>
      </div>

      <div class="room">
        <div class="room_title">Josiah's Music</div>
        <div class="members">
          <img src="../assets/icons/user.svg" alt="user count">
          <span>10</span>
        </div>
      </div>
     
      <div class="room add_room">
        <img src="../assets/icons/add.svg" alt="add note">
      </div>
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

export default {
  name: 'home',
}
</script>
