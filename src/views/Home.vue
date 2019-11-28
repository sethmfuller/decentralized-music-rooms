<template>
  <div id="home" class="home page">
    <div class="header_content">
      <img src="../assets/icons/music_note.svg" alt="music note">
      <h1 class="page_title">Your Rooms</h1>
    </div>

    <div class="rooms">
      <RoomTile :addRoom=false @click="goToRoom()"></RoomTile>
      <RoomTile :addRoom=false></RoomTile>
      <RoomTile :addRoom=true @click="this.createRoom()"></RoomTile>
      <button v-on:click="createRoom('room'+Math.random())">Create room</button>
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
const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');
// const fs = require('fs');
const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
})

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }
  console.log('IPFS node ready with address ' + info.id)
}));
  


function repo () {
  return 'ipfs/pubsub-demo/' + Math.random()
}


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
    createRoom(roomName) {
      const room = Room(ipfs, roomName)
//       fs.appendFile('roomNames.txt', roomName, function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

  room.on('peer joined', (peer) => console.log('peer ' + peer + ' joined'))
  room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

  // send and receive messages

  room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'))
  room.on('message', (message) => console.log('got message from ' + message.from + ': ' + message.data.toString()))

  // broadcast message every 2 seconds

  setInterval(() => room.broadcast('hey everyone!'), 2000)
//   setInterval(() => fs.readFile('roomNames.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// }), 5000)
    }
  }
}
</script>
