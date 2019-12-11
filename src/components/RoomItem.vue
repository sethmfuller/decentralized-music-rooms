<template>
  <div class="roomItem" >
    <div class="room_title" @click="goToRoom"><span :title="room.name">{{room.name}}</span></div>
    <div class="members" :title="`${memberCount} member(s)`" @click="goToRoom">
      <img src="../assets/icons/user.svg" alt="user count">
      <span>{{memberCount}}</span>
    </div>
    <div class="leave-link" @click="leaveRoom">
      LEAVE
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomItem',

  props: {
    room: null,
  },

  computed: {
    memberCount() {
      return this.room.obj.getPeers().length + 1;
    }
  },

  methods: {
    goToRoom() {
      this.$router.push({
        name: 'room',
        params: { RoomName: this.room.name }
      });
    },

    leaveRoom() {
      this.$emit('leaveRoom', this.room);
    }
  },
}
</script>