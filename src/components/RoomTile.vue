<template>
  <div :class="addRoom ? 'roomtile add_room' : 'roomtile' ">
    <div v-if="!addRoom" class="room_title">Seth's Electronic Music</div>
    <div v-if="!addRoom" class="members">
      <img src="../assets/icons/user.svg" alt="user count">
      <span>3</span>
    </div>
    <img v-if="addRoom" src="../assets/icons/add.svg" alt="add room">
  </div>
</template>

<script>
export default {
  name: 'roomtile',

  props: {
    addRoom: Boolean
  },
}
</script>